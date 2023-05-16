import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export type pendingUser = {
  name: string;
  email: string;
  role: string;
  supervisor?: string;
};

export const createPendingUser = async ({
  name,
  email,
  role,
  supervisor,
}: pendingUser) => {
  if (!email || !role || !name) {
    return;
  }

  if (role === "apprentice" && !supervisor) {
    return;
  }
  const data: pendingUser = {
    name,
    email,
    role,
  };

  if (supervisor) {
    data.supervisor = supervisor;
  }

  const docRef = await addDoc(collection(db, "pending users"), data);

  if (!docRef) {
    return false;
  }
  return true;
};
