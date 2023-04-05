import { collection, getDocs } from "firebase/firestore";
import { User } from "../../types/user.type";
import { db } from "../config";

export const fetchUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const usersData = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
  return usersData;
};
