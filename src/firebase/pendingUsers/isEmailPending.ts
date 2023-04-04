import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

export const isEmailPending = async (email: string) => {
  const q = query(collection(db, "pending users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const doc = querySnapshot.docs[0];
  if (!doc) {
    return false;
  }
  return doc.data();
};
