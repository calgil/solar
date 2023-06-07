import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";
import { UploadMpr } from "../../types/mpr.type";

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
