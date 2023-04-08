import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "../../types/user.type";
import { db } from "../config";

export const fetchUsers = async (supervisorId?: string) => {
  const usersCollection = collection(db, "users");

  let usersQuery = query(usersCollection);

  if (supervisorId) {
    usersQuery = query(
      usersCollection,
      where("supervisorId", "==", supervisorId)
    );
  }

  const usersSnapshot = await getDocs(usersQuery);
  const usersData = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
  return usersData;
};
