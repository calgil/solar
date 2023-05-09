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
    startDate?: Date,
    endDate?: Date
  ) => {
    console.log({ startDate });

    try {
      const collectionRef = collection(db, "mprs");
      let approvedQueryRef = query(collectionRef);
      let unapprovedQueryRef = query(collectionRef);

      if (startDate) {
        approvedQueryRef = query(
          approvedQueryRef,
          where("date", ">=", startDate)
        );
        unapprovedQueryRef = query(
          unapprovedQueryRef,
          where("date", ">=", startDate)
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

      if (endDate) {
        approvedQueryRef = query(
          approvedQueryRef,
          where("date", "<=", endDate)
        );
        unapprovedQueryRef = query(
          unapprovedQueryRef,
          where("date", "<=", endDate)
        );
      }
      approvedQueryRef = query(
        approvedQueryRef,
        orderBy("date"),
        orderBy("apprenticeName")
      );
      unapprovedQueryRef = query(
        unapprovedQueryRef,
        orderBy("date"),
        orderBy("apprenticeName")
      );
      const approvedDocumentSnapshots = await getDocs(approvedQueryRef);
      const unapprovedDocumentSnapshots = await getDocs(unapprovedQueryRef);
      const approvedApprenticeIds = new Set(
        approvedDocumentSnapshots.docs.map((doc) => doc.data().apprenticeId)
      );
      const unapprovedApprenticeIds = new Set(
        unapprovedDocumentSnapshots.docs.map((doc) => doc.data().apprenticeId)
      );

      console.log({ approvedApprenticeIds, unapprovedApprenticeIds });

      if (approval) {
        for (const apprenticeId of unapprovedApprenticeIds) {
          approvedApprenticeIds.delete(apprenticeId);
        }
      }

      return Array.from(approvedApprenticeIds);
    } catch (error) {
      console.error(error);
      throw new Error("could not get apprentice ids from mprs");
    }
  };

  const fetchLastMonthData = async (approval: boolean) => {
    console.log("last month");

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let startMonth, year;

    if (today.getDate() < 10) {
      startMonth = currentMonth - 2;
      year = currentYear;
      if (startMonth < 0) {
        startMonth += 12;
        year -= 1;
      }
    } else {
      startMonth = currentMonth - 1;
      year = currentYear;
    }

    const startDate = new Date(year, startMonth, 1);
    const endDate = new Date(year, startMonth, 28);

    const apprenticeIds = await getApprenticeIdFromMpr(
      approval,
      startDate,
      endDate
    );

    console.log("last month", { apprenticeIds, startDate, endDate });
    return apprenticeIds;
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
      const desiredStaff = users.filter((user) =>
        apprenticeIds.includes(user.id)
      );
      setStaffData(desiredStaff);
      return console.log({ apprenticeIds, users });
    }
    if (dateRange === 1) {
      const apprenticeIds = await fetchLastMonthData(approval);
      const desiredStaff = users.filter((user) =>
        apprenticeIds.includes(user.id)
      );
      return setStaffData(desiredStaff);
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
