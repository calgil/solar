import { addDoc, collection } from "firebase/firestore";
import { MprType } from "../../types/mpr.type";
import { db } from "../config";

export type UploadMpr = {
  id?: string;
  userId: string;
  username: string;
  date: Date;
  photoUrl: string;
  psHours: number;
  oresHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
  supervisorId: string;
};

export const createMpr = async ({
  userId,
  username,
  date,
  photoUrl,
  psHours,
  oresHours,
  bosHours,
  otherHours,
  totalHours,
  apprenticeSignature,
  supervisorSignature,
  supervisorId,
}: UploadMpr) => {
  const data = {
    userId,
    username,
    date,
    // photoUrl,
    psHours,
    oresHours,
    bosHours,
    otherHours,
    totalHours,
    apprenticeSignature,
    supervisorSignature,
    supervisorId,
  };
  // console.log("cannot upload mpr yet");

  await addDoc(collection(db, "mprs"), data);
};
