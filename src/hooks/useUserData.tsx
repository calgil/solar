import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { User, UserRole, UserStatus } from "../types/user.type";
import { MprType } from "../types/mpr.type";

export type QueryResult = {
  staffData: User[];
  handleFilterChange: (
    role: UserRole,
    status: UserStatus,
    missingMPR: number,
    dateRange: number,
    approval: boolean
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

    return apprenticeIds;
  };

  const getApprenticesMissingMPRs = async () => {
    try {
      const collectionRef = collection(db, "mprs");
      const allMprs = await getDocs(collectionRef);

      const apprenticesMap: { [key: string]: MprType[] } = {};

      allMprs.forEach((mprDoc) => {
        const mprData = { id: mprDoc.id, ...mprDoc.data() } as MprType;
        const apprenticeId = mprData.apprenticeId;

        if (!(apprenticeId in apprenticesMap)) {
          apprenticesMap[apprenticeId] = [];
        }

        apprenticesMap[apprenticeId].push(mprData);
      });
      const apprenticesMissingMPRs: string[] = [];
      for (const [apprenticeId, mprs] of Object.entries(apprenticesMap)) {
        mprs.sort((a, b) => a.date.toMillis() - b.date.toMillis()); // Sort MPRs by date ascending

        if (mprs.length > 0) {
          const startDate = new Date(mprs[0].date.toMillis());
          const currentDate = new Date();

          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() - 1;

          let year = startDate.getFullYear();
          let month = startDate.getMonth();

          while (year <= currentYear && month <= currentMonth) {
            const isMissing = !mprs.some((mpr) => {
              const mprYear = mpr.date.toDate().getFullYear();
              const mprMonth = mpr.date.toDate().getMonth();
              return mprYear === year && mprMonth === month;
            });

            if (isMissing) {
              apprenticesMissingMPRs.push(apprenticeId);
            }

            month++;
            if (month > 11) {
              month = 0;
              year++;
            }
          }
        }
      }
      return apprenticesMissingMPRs;
    } catch (error) {
      console.error(error);
      throw new Error("could not get apprentices with missing mprs");
    }
  };

  const handleFilterChange = async (
    role: UserRole,
    status: UserStatus,
    missingMPR: number,
    dateRange: number,
    approval: boolean
  ) => {
    const users = await fetchUsers(status, role);
    if (role !== "apprentice") {
      return setStaffData(users);
    }
    if (missingMPR) {
      const missingApprenticeIds = await getApprenticesMissingMPRs();
      const desiredStaff = users.filter((user) =>
        missingApprenticeIds.includes(user.id)
      );

      return setStaffData(desiredStaff);
    }
    if (dateRange === -1) {
      const apprenticeIds = await getApprenticeIdFromMpr(approval);

      const desiredStaff = users.filter((user) =>
        apprenticeIds.includes(user.id)
      );

      return setStaffData(desiredStaff);
    }
    if (dateRange === 1) {
      const apprenticeIds = await fetchLastMonthData(approval);
      const desiredStaff = users.filter((user) =>
        apprenticeIds.includes(user.id)
      );
      return setStaffData(desiredStaff);
    }

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
