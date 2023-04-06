import {
  collection,
  getDocs,
  // limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { mprType } from "../../types/mpr.type";
import { db } from "../config";

export type ApprenticeData = {
  totalHours: number;
  psHours: number;
  oresHours: number;
  bosHours: number;
  otherHours: number;
  mprs: mprType[];
};

export const getApprenticeData = async (apprenticeId: string) => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("userId", "==", apprenticeId),
    orderBy("date", "desc")
    // limit(3)
  );

  const mprsSnapshot = await getDocs(mprsQuery);
  const mprs = mprsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as mprType[];

  const totalHours = mprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
  const psHours = mprs.reduce((acc, mpr) => acc + mpr.psHours, 0);
  const oresHours = mprs.reduce((acc, mpr) => acc + mpr.resHours, 0);
  const bosHours = mprs.reduce((acc, mpr) => acc + mpr.bosHours, 0);
  const otherHours = mprs.reduce((acc, mpr) => acc + mpr.otherHours, 0);

  return {
    totalHours,
    psHours,
    oresHours,
    bosHours,
    otherHours,
    mprs,
  };
};
