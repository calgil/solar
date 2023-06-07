import { doc, updateDoc } from "firebase/firestore";
import { UploadTraining } from "../../types/training.type";
import { db } from "../config";

export const updateTraining = async (id: string, training: UploadTraining) => {
  try {
    await updateDoc(doc(db, "trainings", id), training);
  } catch (error) {
    console.error(error);
  }
};
