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
  fetchApprenticeByName: (name: string) => void;
  clear: () => void;
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
            (mpr) => !mpr.supervisorSignature
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

  const fetchApprenticeByName = async (name: string): Promise<void> => {
    try {
      const usersCollection = collection(db, "users");
      const queryRef = query(usersCollection, where("name", "==", name));
      const userSnapshot = await getDocs(queryRef);
      const user = userSnapshot.docs[0];
      if (!user) {
        return;
      }
      const data = await getApprenticeData(user.id);
      return setApprenticeData([
        {
          apprenticeId: user.id,
          data,
          name,
          hasUnapprovedMpr: data.mprs.some((mpr) => !mpr.supervisorSignature),
        },
      ]);
    } catch (error) {
      console.error(error);
      throw new Error("Could not get user by name");
    }
  };

  const getInitData = async () => {
    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - 6);
    const data = await fetchMprs(beforeDate);
    setApprenticeData(data);
  };

  const clear = () => {
    getInitData();
  };

  useEffect(() => {
    console.log("use Effect ran");

    getInitData();
  }, [filters]);

  return { apprenticeData, handleFilterChange, fetchApprenticeByName, clear };
};
