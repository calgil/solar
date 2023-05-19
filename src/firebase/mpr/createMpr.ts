import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";

export type UploadMpr = {
  id?: string;
  apprenticeId: string;
  apprenticeName: string;
  date: Date;
  dateApproved: Date | null;
  photoUrl: string;
  pvHours: number;
  otherREHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
  supervisorId: string;
};

export const createMpr = async ({
  apprenticeId,
  apprenticeName,
  date,
  dateApproved,
  photoUrl,
  pvHours,
  otherREHours,
  bosHours,
  otherHours,
  totalHours,
  apprenticeSignature,
  supervisorSignature,
  supervisorId,
}: UploadMpr) => {
  const data = {
    apprenticeId,
    apprenticeName,
    date,
    dateApproved,
    photoUrl,
    pvHours,
    otherREHours,
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
