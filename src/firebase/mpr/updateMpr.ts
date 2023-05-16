import { doc, updateDoc } from "firebase/firestore";
import { UploadMpr } from "./createMpr";
import { db } from "../config";
import { toast } from "react-toastify";

export const updateMpr = async (id: string, mpr: UploadMpr) => {
  try {
    await updateDoc(doc(db, "mprs", id), mpr);
    toast.success("MPR updated successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update MPR");
  }
};
