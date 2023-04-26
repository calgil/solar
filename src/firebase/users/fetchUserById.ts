import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";
import { User } from "../../types/user.type";

export const fetchUserById = async (id: string): Promise<User | null> => {
  console.log({ id });

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return { ...user, id: docSnap.id } as User;
  }
  return null;
};
