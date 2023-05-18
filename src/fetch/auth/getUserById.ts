import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { User } from "../../types/user.type";

export const getUserById = (
  id: string,
  callback: (userData: User | null) => void
) => {
  const docRef = doc(db, "users", id);
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (!docSnap.exists()) {
      callback(null);
    }
    if (docSnap.exists()) {
      const userData = { id: docSnap.id, ...docSnap.data() } as User;
      callback(userData);
    }
  });
  return unsubscribe;
};
