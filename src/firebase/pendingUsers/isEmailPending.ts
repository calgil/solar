import { collection, getDocs, query, where } from "firebase/firestore";
import { NewUser } from "../../providers/auth.provider";
import { db } from "../config";

export const isEmailPending = async (email: string) => {
  const pendingUserQuerySnapshot = await getDocs(
    query(collection(db, "pending users"), where("email", "==", email))
  );
  const pendingUserDocSnapshot = pendingUserQuerySnapshot.docs[0];

  if (!pendingUserDocSnapshot) {
    throw new Error("Email not found in pending users collection.");
  }

  const { name, role, supervisor } = pendingUserDocSnapshot.data();

  const user: NewUser = {
    name,
    role,
  };

  if (supervisor) {
    user.supervisorId = supervisor;
  }

  return { id: pendingUserDocSnapshot.id, ...user };
};
