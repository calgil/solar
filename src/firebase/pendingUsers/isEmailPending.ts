import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

export const isEmailPending = async (email: string) => {
  const pendingUserQuerySnapshot = await getDocs(
    query(collection(db, "pending users"), where("email", "==", email))
  );
  const pendingUserDocSnapshot = pendingUserQuerySnapshot.docs[0];

  if (!pendingUserDocSnapshot) {
    throw new Error("Email not found in pending users collection.");
  }

  return { user: pendingUserDocSnapshot.data(), id: pendingUserDocSnapshot.id };
};
