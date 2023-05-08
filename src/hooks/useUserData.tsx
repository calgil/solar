import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { UserRole, UserStatus } from "../types/user.type";
import {
  ApprenticeData,
  getApprenticeData,
} from "../firebase/mpr/getApprenticeData";

export type QueryResult = {
  staffData: ApprenticeData[];
};

export const useUserData = (): QueryResult => {
  const [staffData, setStaffData] = useState<ApprenticeData[]>([]);

  const fetchUsers = async (
    status: UserStatus = "active",
    role: UserRole = "apprentice"
  ) => {
    const usersQuery = query(
      collection(db, "users"),
      where("status", "==", status),
      where("role", "==", role),
      orderBy("name")
    );

    const usersSnapshot = await getDocs(usersQuery);

    const userIds = usersSnapshot.docs.map((doc) => doc.id);

    return userIds;
  };

  const getApprenticeIdFromMpr = async (
    beforeDate: Date,
    approval: boolean
  ) => {
    try {
      const collectionRef = collection(db, "mprs");
      const mprQueryRef = query(
        collectionRef,
        where("date", ">=", beforeDate),
        where("supervisorSignature", "==", approval),
        orderBy("date"),
        orderBy("apprenticeName")
      );
      const documentSnapshot = await getDocs(mprQueryRef);
      const apprenticeIdSet = new Set(
        documentSnapshot.docs.map((doc) => doc.data().apprenticeId)
      );
      return Array.from(apprenticeIdSet);
    } catch (error) {
      console.error(error);
      throw new Error("could not get apprentice ids from mprs");
    }
  };

  const getInitData = async () => {
    const userIds = await fetchUsers();

    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - 6);
    const apprenticeIds = await getApprenticeIdFromMpr(beforeDate, false);

    const desiredStaff = userIds.filter((id) => apprenticeIds.includes(id));

    const staffData = await Promise.all(
      desiredStaff.map(async (id) => await getApprenticeData(id))
    );

    console.log({ staffData });

    setStaffData(staffData);

    // now find all mprs within a date and approved, pull apprenticeId from that
    // compare these ids with the ones from fetchUsers
    // get apprenticeData for all ids that are in both arrays

    // const apprenticeDataPromise = ids.map(async (id) => {
    //   const data = await getApprenticeData(id);
    //   const apprenticeId = id;
    //   const name = data.mprs[0].apprenticeName;
    //   const hasUnapprovedMpr = data.mprs.some(
    //     (mpr) => !mpr.supervisorSignature
    //   );
    //   return { apprenticeId, name, data, hasUnapprovedMpr };
    // });

    // const data = await Promise.all(apprenticeDataPromise);
    // setApprenticeData(data);
  };

  useEffect(() => {
    getInitData();
  }, []);

  return { staffData };
};
