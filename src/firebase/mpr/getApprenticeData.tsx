import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { MprType } from "../../types/mpr.type";
import { db } from "../config";

export type MprData = {
  totalHours: number;
  pvHours: number;
  otherREHours: number;
  bosHours: number;
  otherHours: number;
  hasUnapprovedMpr: boolean;
  mprs: MprType[];
};

export type ApprenticeData = {
  id: string;
  name: string;
  data: MprData;
};

export const getApprenticeData = async (
  apprenticeId: string
): Promise<ApprenticeData> => {
  const mprsQuery = query(
    collection(db, "mprs"),
    where("apprenticeId", "==", apprenticeId),
    orderBy("date", "desc")
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      mprsQuery,
      (querySnapshot) => {
        const mprs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MprType[];

        const totalHours = mprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
        const pvHours = mprs.reduce((acc, mpr) => acc + mpr.pvHours, 0);
        const otherREHours = mprs.reduce(
          (acc, mpr) => acc + mpr.otherREHours,
          0
        );
        const bosHours = mprs.reduce((acc, mpr) => acc + mpr.bosHours, 0);
        const otherHours = mprs.reduce((acc, mpr) => acc + mpr.otherHours, 0);
        const hasUnapprovedMpr = mprs.some((mpr) => !mpr.supervisorSignature);

        const apprenticeData = {
          id: mprs[0].apprenticeId,
          name: mprs[0].apprenticeName,
          data: {
            totalHours,
            pvHours,
            otherREHours,
            bosHours,
            otherHours,
            hasUnapprovedMpr,
            mprs,
          },
        };

        resolve(apprenticeData);
      },
      reject
    );

    return unsubscribe;
  });

  // const mprsSnapshot = await getDocs(mprsQuery);
  // const mprs = mprsSnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // })) as MprType[];

  // const totalHours = mprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
  // const pvHours = mprs.reduce((acc, mpr) => acc + mpr.psHours, 0);
  // const otherREHours = mprs.reduce((acc, mpr) => acc + mpr.otherREHours, 0);
  // const bosHours = mprs.reduce((acc, mpr) => acc + mpr.bosHours, 0);
  // const otherHours = mprs.reduce((acc, mpr) => acc + mpr.otherHours, 0);

  // return {
  //   totalHours,
  //   pvHours,
  //   otherREHours,
  //   bosHours,
  //   otherHours,
  //   mprs,
  // };
};
