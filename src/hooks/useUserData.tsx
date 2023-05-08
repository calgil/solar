import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { User, UserRole, UserStatus } from "../types/user.type";

export type QueryResult = {
  staffData: User[];
  handleFilterChange: (
    dateRange: number,
    approval: boolean,
    status: UserStatus,
    role: UserRole
  ) => void;
  fetchStaffByName: (name: string) => void;
  clear: () => void;
};

export const useUserData = (): QueryResult => {
  const [staffData, setStaffData] = useState<User[]>([]);

  const fetchUsers = async (
    status: UserStatus = "active",
    role: UserRole = "apprentice"
  ) => {
    console.log({ status, role });

    const usersQuery = query(
      collection(db, "users"),
      where("status", "==", status),
      where("role", "==", role),
      orderBy("name")
    );

    const usersSnapshot = await getDocs(usersQuery);

    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    return users;
  };

  const getApprenticeIdFromMpr = async (
    approval: boolean,
    beforeDate?: Date
  ) => {
    try {
      const collectionRef = collection(db, "mprs");
      let mprQueryRef = query(
        collectionRef,
        where("supervisorSignature", "==", approval)
      );
      if (beforeDate) {
        mprQueryRef = query(mprQueryRef, where("date", ">=", beforeDate));
      }

      mprQueryRef = query(
        mprQueryRef,
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

  const fetchLastMonthData = async (approval: boolean) => {
    console.log("last month", { approval });
  };

  const handleFilterChange = async (
    dateRange: number,
    approval: boolean,
    status: UserStatus,
    role: UserRole
  ) => {
    const users = await fetchUsers(status, role);
    if (role !== "apprentice") {
      console.log("not apprentice", users);

      return setStaffData(users);
    }
    if (dateRange === -1) {
      const apprenticeIds = await getApprenticeIdFromMpr(approval);
      return console.log({ apprenticeIds });

      // get all mprs
    }
    if (dateRange === 1) {
      fetchLastMonthData(approval);
    }
    console.log("handle Filter change", dateRange, approval);

    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - dateRange);
    const apprenticeIds = await getApprenticeIdFromMpr(approval, beforeDate);

    const desiredStaff = users.filter((user) =>
      apprenticeIds.includes(user.id)
    );

    setStaffData(desiredStaff);
  };

  const fetchStaffByName = async (name: string) => {
    try {
      console.log({ name });

      const usersCollection = collection(db, "users");
      const queryRef = query(usersCollection, where("name", "==", name));
      const userSnapshot = await getDocs(queryRef);
      const users = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      if (users.length === 0) {
        return;
      }
      setStaffData([users[0]]);
    } catch (error) {
      console.error(error);
      throw new Error("could not get staff by name");
    }
  };

  const getInitData = async () => {
    const users = await fetchUsers();

    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - 6);
    const apprenticeIds = await getApprenticeIdFromMpr(false, beforeDate);

    const desiredStaff = users.filter((user) =>
      apprenticeIds.includes(user.id)
    );

    setStaffData(desiredStaff);
  };

  const clear = () => getInitData();

  useEffect(() => {
    getInitData();
  }, []);

  return { staffData, handleFilterChange, fetchStaffByName, clear };
};
