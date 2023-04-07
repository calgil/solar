import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { MprType } from "../../types/mpr.type";
import { db } from "../config";

export const fetchMprs = (
  userId: string,
  callback: (mprs: MprType[]) => void
) => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("userId", "==", userId),
    orderBy("date", "desc")
  );
  const unsubscribe = onSnapshot(mprsQuery, (mprsSnapshot) => {
    const mprsData = mprsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MprType[];
    callback(mprsData);
  });
  return unsubscribe;
};
