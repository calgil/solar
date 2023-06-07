import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";

export const deleteTraining = async (id: string) => {
  try {
    const trainingRef = doc(db, "trainings", id);
    await deleteDoc(trainingRef);
    toast.success("Training deleted");
  } catch (error) {
    console.error(error);
    toast.error("Could not delete training");
  }
};
