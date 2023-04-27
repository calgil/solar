import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import {
  ApprenticeData,
  getApprenticeData,
} from "../firebase/mpr/getApprenticeData";

export type QueryResult = {
  apprenticeData: ApprenticeMprData[];
  pastThreeMonths: () => void;
  pastSixMonths: () => void;
};

export type ApprenticeMprData = {
  apprenticeId: string;
  name: string;
  data: ApprenticeData;
  hasUnapprovedMpr: boolean;
};

export const useStaffData = (): QueryResult => {
  const [apprenticeData, setApprenticeData] = useState<ApprenticeMprData[]>([]);

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const fetchMprs = async (beforeDate: Date = threeMonthsAgo) => {
    try {
      const collectionRef = collection(db, "mprs");
      const queryRef = query(collectionRef, where("date", ">=", beforeDate));

      const documentSnapshots = await getDocs(queryRef);

      const apprenticeIds = new Set(
        documentSnapshots.docs.map((doc) => doc.data().apprenticeId)
      );

      console.log({ apprenticeIds });

      const apprenticeDataPromise = Array.from(apprenticeIds).map(
        async (id) => {
          const data = await getApprenticeData(id);
          const apprenticeId = data.mprs[0].apprenticeId;
          const name = data.mprs[0].apprenticeName;
          const hasUnapprovedMpr = data.mprs.some(
            (mpr) => !mpr.supervisorSignature || !mpr.adminApproval
          );

          return { apprenticeId, name, data, hasUnapprovedMpr };
        }
      );

      Promise.all(apprenticeDataPromise).then((data) => {
        console.log({ data });
        setApprenticeData(data);
      });
    } catch (error) {
      console.error(error);
      throw new Error("Could not fetch mprs");
    }
  };

  const pastThreeMonths = () => {
    console.log("three months");
    fetchMprs();
  };

  const pastSixMonths = () => {
    console.log("six months");
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    fetchMprs(sixMonthsAgo);
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      await fetchMprs();
    };
    fetchAndSetData();
  }, []);

  return { apprenticeData, pastThreeMonths, pastSixMonths };
};
