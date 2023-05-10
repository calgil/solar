import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config";
import { User } from "../../types/user.type";

export const fetchUserData = (
  id: string,
  callback: (user: User | null) => void
) => {
  const unsubscribe = onSnapshot(doc(db, "users", id), (doc) => {
    if (doc.exists()) {
      const user = {
        id: doc.id,
        ...doc.data(),
      } as User;
      callback(user);
    } else {
      callback(null);
    }
  });
  return unsubscribe;
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return { ...user, id: docSnap.id } as User;
  }
  return null;
};
