import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";

export type Updates = {
  role: string;
  supervisorId: string;
};

type UpdateUserProps = {
  id: string;
  updates: Updates;
};

export const updateUser = async ({ id, updates }: UpdateUserProps) => {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, updates);
};
