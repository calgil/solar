import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import {
  ApprenticeData,
  getApprenticeData,
} from "../firebase/mpr/getApprenticeData";

export type QueryResult = {
  apprenticeData: ApprenticeMprData[];
  handleFilterChange: (dateRange: number, approval?: boolean) => void;
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

  const fetchApprenticeData = async (apprenticeIds: Set<string>) => {
    const apprenticeDataPromise = Array.from(apprenticeIds).map(async (id) => {
      const data = await getApprenticeData(id);
      const apprenticeId = id;
      const name = data.mprs[0].apprenticeName;
      const hasUnapprovedMpr = data.mprs.some(
        (mpr) => !mpr.supervisorSignature
      );
      return { apprenticeId, name, data, hasUnapprovedMpr };
    });

    const data = await Promise.all(apprenticeDataPromise);
    return data;
  };

  const fetchMprs = async (beforeDate?: Date, approval?: boolean) => {
    try {
      const collectionRef = collection(db, "mprs");

      let approvedQueryRef = query(collectionRef);
      let unapprovedQueryRef = query(collectionRef);

      if (beforeDate) {
        approvedQueryRef = query(
          approvedQueryRef,
          where("date", ">=", beforeDate)
        );
        unapprovedQueryRef = query(
          unapprovedQueryRef,
          where("date", ">=", beforeDate)
        );
      }

      if (approval) {
        approvedQueryRef = query(
          approvedQueryRef,
          where("supervisorSignature", "==", true)
        );
        unapprovedQueryRef = query(
          unapprovedQueryRef,
          where("supervisorSignature", "==", false)
        );
      }

      if (!approval) {
        approvedQueryRef = query(
          approvedQueryRef,
          where("supervisorSignature", "==", false)
        );
        unapprovedQueryRef = query(
          unapprovedQueryRef,
          where("supervisorSignature", "==", true)
        );
      }

      approvedQueryRef = query(approvedQueryRef, orderBy("date"));
      approvedQueryRef = query(approvedQueryRef, orderBy("apprenticeName"));

      unapprovedQueryRef = query(unapprovedQueryRef, orderBy("date"));
      unapprovedQueryRef = query(unapprovedQueryRef, orderBy("apprenticeName"));

      const approvedDocumentSnapshots = await getDocs(approvedQueryRef);
      const unapprovedDocumentSnapshots = await getDocs(unapprovedQueryRef);

      const approvedApprenticeIds = new Set(
        approvedDocumentSnapshots.docs.map((doc) => doc.data().apprenticeId)
      );

      const unapprovedApprenticeIds = new Set(
        unapprovedDocumentSnapshots.docs.map((doc) => doc.data().apprenticeId)
      );

      if (approval) {
        for (const apprenticeId of unapprovedApprenticeIds) {
          approvedApprenticeIds.delete(apprenticeId);
        }
      }

      const data = fetchApprenticeData(approvedApprenticeIds);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Could not fetch mprs");
    }
  };

  const fetchLastMonthData = async (approval?: boolean) => {
    const today = new Date();
    const currentMonth = today.getMonth();

    let beforeMonth = currentMonth - (today.getDate() < 10 ? 2 : 1);
    if (beforeMonth < 0) {
      beforeMonth = 11;
    }

    const beforeDate = new Date(today.getFullYear(), beforeMonth, 1);
    const data = await fetchMprs(beforeDate, approval);
    setApprenticeData(data);
  };

  const handleFilterChange = async (months: number, approval?: boolean) => {
    if (months === -1) {
      const data = await fetchMprs(undefined, approval);
      return setApprenticeData(data);
    }
    if (months === 1) {
      return fetchLastMonthData(approval);
    }
    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - months);
    const data = await fetchMprs(beforeDate, approval);
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
    const data = await fetchMprs(beforeDate, false);
    setApprenticeData(data);
  };

  const clear = () => {
    getInitData();
  };

  useEffect(() => {
    getInitData();
  }, [filters]);

  return { apprenticeData, handleFilterChange, fetchApprenticeByName, clear };
};
