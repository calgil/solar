import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { User, UserRole, UserStatus } from "../types/user.type";

export type QueryResult = {
  users: User[];
};

export const useUserData = (): QueryResult => {
  const [users, setUsers] = useState<User[]>([]);

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

    console.log({ users });

    return users;
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
    const users = await fetchUsers();

    const beforeDate = new Date();
    beforeDate.setMonth(beforeDate.getMonth() - 6);
    const apprenticeIds = await getApprenticeIdFromMpr(beforeDate, false);
    console.log({ apprenticeIds });

    const desiredStaff = users.filter((user) =>
      apprenticeIds.includes(user.id)
    );

    setUsers(desiredStaff);
  };

  useEffect(() => {
    getInitData();
  }, []);

  return { users };
};
