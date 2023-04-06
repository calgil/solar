import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

type createPendingUserProps = {
  email: string;
  role: string;
  supervisor?: string;
};

export const createPendingUser = async ({
  email,
  role,
  supervisor,
}: createPendingUserProps) => {
  if (!email || !role) {
    return console.log("Missing info");
  }

  if (role === "apprentice" && !supervisor) {
    return console.log("apprentices need supervision");
  }
  const data = {
    email,
    role,
    supervisor,
  };

  const docRef = await addDoc(collection(db, "pending users"), data);

  if (!docRef) {
    return false;
  }
  return true;
};
