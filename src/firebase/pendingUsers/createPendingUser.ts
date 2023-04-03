import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

type createPendingUserProps = {
  email: string;
  role: string;
};

export const createPendingUser = async ({
  email,
  role,
}: createPendingUserProps) => {
  if (!email || !role) {
    return console.log("Missing info");
  }
  const data = {
    email,
    role,
  };
  const docRef = await addDoc(collection(db, "pending users"), data);
  console.log("passed", docRef.id);

  if (!docRef) {
    return false;
  }
  return true;
};
