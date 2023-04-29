import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import {
  ApprenticeData,
  getApprenticeData,
} from "../firebase/mpr/getApprenticeData";

export type QueryResult = {
  apprenticeData: ApprenticeMprData[];
  handleFilterChange: (newFilter: number) => void;
};

export type ApprenticeMprData = {
  apprenticeId: string;
  name: string;
  data: ApprenticeData;
  hasUnapprovedMpr: boolean;
};

export const useStaffData = (): QueryResult => {
  const [apprenticeData, setApprenticeData] = useState<ApprenticeMprData[]>([]);
  const [filters] = useState(0);

  const fetchMprs = async (beforeDate: Date) => {
    try {
      const collectionRef = collection(db, "mprs");
      const queryRef = query(collectionRef, where("date", ">=", beforeDate));

      const documentSnapshots = await getDocs(queryRef);

      const apprenticeIds = new Set(
        documentSnapshots.docs.map((doc) => doc.data().apprenticeId)
      );

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

      const data = await Promise.all(apprenticeDataPromise);
      console.log({ data });

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Could not fetch mprs");
    }
  };

  const handleFilterChange = async (months: number) => {
    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - months);
    const data = await fetchMprs(beforeDate);
    return setApprenticeData(data);
  };

  useEffect(() => {
    console.log("use Effect ran");

    const getInitData = async () => {
      const beforeDate = new Date();
      beforeDate.setMonth(beforeDate.getMonth() - 6);
      const data = await fetchMprs(beforeDate);
      setApprenticeData(data);
    };
    getInitData();
  }, [filters]);

  return { apprenticeData, handleFilterChange };
};
