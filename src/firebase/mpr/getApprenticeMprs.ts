import { collection, onSnapshot, query, where } from "firebase/firestore";
import { mprType } from "../../types/mpr.type";
import { db } from "../config";

export const fetchMprs = (
  userId: string,
  callback: (mprs: mprType[]) => void
) => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("userId", "==", userId)
  );
  const unsubscribe = onSnapshot(mprsQuery, (mprsSnapshot) => {
    const mprsData = mprsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as mprType[];
    callback(mprsData);
  });
  return unsubscribe;
};
