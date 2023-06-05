import { doc, updateDoc } from "firebase/firestore";
import { UploadTraining } from "../../types/training.type";
import { db } from "../config";
import { toast } from "react-toastify";

export const updateTraining = async (id: string, training: UploadTraining) => {
  try {
    await updateDoc(doc(db, "trainings", id), training);
    toast.success("Training updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update MPR");
  }
};
