import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { User } from "../../types/user.type";
import { db } from "../config";

export const fetchUsers = async (
  role: "apprentice" | "supervisor" = "apprentice",
  supervisorId?: string
) => {
  const usersCollection = collection(db, "users");

  let usersQuery = query(
    usersCollection,
    where("role", "==", role),
    where("status", "==", "active")
  );

  if (supervisorId) {
    usersQuery = query(
      usersCollection,
      where("supervisorId", "==", supervisorId),
      orderBy("name")
    );
  }

  const usersSnapshot = await getDocs(usersQuery);
  const usersData = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
  return usersData;
};
