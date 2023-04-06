import { addDoc, collection } from "firebase/firestore";
import { mprType } from "../../types/mpr.type";
import { db } from "../config";

export const createMpr = async ({
  userId,
  username,
  date,
  photoUrl,
  psHours,
  resHours,
  bosHours,
  otherHours,
  totalHours,
  apprenticeSignature,
  supervisorSignature,
}: mprType) => {
  const data = {
    userId,
    username,
    date,
    photoUrl,
    psHours,
    resHours,
    bosHours,
    otherHours,
    totalHours,
    apprenticeSignature,
    supervisorSignature,
  };
  console.log("cannot upload mpr yet");

  // await addDoc(collection(db, "mprs"), data);
};
