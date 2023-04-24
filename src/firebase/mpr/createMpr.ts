import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";

export type UploadMpr = {
  id?: string;
  apprenticeId: string;
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
  adminApproval: boolean;
};

export const createMpr = async ({
  apprenticeId,
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
  adminApproval,
}: UploadMpr) => {
  const data = {
    apprenticeId,
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
    adminApproval,
  };

  try {
    await addDoc(collection(db, "mprs"), data);
    toast.success("MPR created successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to create MPR");
  }
};
