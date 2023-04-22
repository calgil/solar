import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";

export type UploadMpr = {
  id?: string;
  userId: string;
  apprenticeName: string;
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
  apprenticeName,
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
    apprenticeName,
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
  };

  try {
    await addDoc(collection(db, "mprs"), data);
    toast.success("MPR created successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to create MPR");
  }
};
