import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { MprType } from "../../types/mpr.type";
import { db } from "../config";

export type ApprenticeData = {
  totalHours: number;
  psHours: number;
  oresHours: number;
  bosHours: number;
  otherHours: number;
  mprs: MprType[];
};

export const getApprenticeData = async (apprenticeId: string) => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("apprenticeId", "==", apprenticeId),
    orderBy("date", "desc")
  );

  const mprsSnapshot = await getDocs(mprsQuery);
  const mprs = mprsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MprType[];

  const totalHours = mprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
  const psHours = mprs.reduce((acc, mpr) => acc + mpr.psHours, 0);
  const oresHours = mprs.reduce((acc, mpr) => acc + mpr.oresHours, 0);
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
