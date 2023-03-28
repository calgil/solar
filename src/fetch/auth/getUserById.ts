import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const getUserById = async (id: string) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data();
};
