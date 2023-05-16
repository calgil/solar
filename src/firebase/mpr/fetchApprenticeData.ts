import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { MprType } from "../../types/mpr.type";
import { db } from "../config";
import { ApprenticeData, MprData } from "./getApprenticeData";

export const fetchApprenticeData = (
  apprenticeId: string,
  setApprenticeData: (data: ApprenticeData | null) => void
) => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("apprenticeId", "==", apprenticeId),
    orderBy("date", "desc")
  );
  const unsubscribe = onSnapshot(mprsQuery, (mprsSnapshot) => {
    const mprs = mprsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MprType[];
    if (mprs.length === 0) {
      return setApprenticeData(null);
    }

    const { totalHours, pvHours, otherREHours, bosHours, otherHours } =
      mprs.reduce(
        (totals, mpr) => ({
          totalHours: totals.totalHours + mpr.totalHours,
          pvHours: totals.pvHours + mpr.pvHours,
          otherREHours: totals.otherREHours + mpr.otherREHours,
          bosHours: totals.bosHours + mpr.bosHours,
          otherHours: totals.otherHours + mpr.otherHours,
        }),
        {
          totalHours: 0,
          pvHours: 0,
          otherREHours: 0,
          bosHours: 0,
          otherHours: 0,
        }
      );

    const hasUnapprovedMpr = mprs.some((mpr) => !mpr.supervisorSignature);

    const mprData: MprData = {
      totalHours,
      pvHours,
      otherREHours,
      bosHours,
      otherHours,
      hasUnapprovedMpr,
      mprs: mprs,
    };

    const apprenticeData: ApprenticeData = {
      id: apprenticeId,
      name: mprs[0].apprenticeName,
      data: mprData,
    };
    setApprenticeData(apprenticeData);
  });

  return unsubscribe;
};
