import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";
import { UploadMpr } from "../../types/mpr.type";

export const updateMpr = async (id: string, mpr: UploadMpr) => {
  try {
    await updateDoc(doc(db, "mprs", id), mpr);
    toast.success("MPR updated successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update MPR");
  }
};
