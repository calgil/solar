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
  apprenticeId: string,
  callback: (mprs: MprType[]) => void
) => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("apprenticeId", "==", apprenticeId),
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
