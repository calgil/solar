import { addDoc, collection } from "firebase/firestore";
import { mprType } from "../../types/mpr.type";
import { db } from "../config";

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
}: mprType) => {
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
