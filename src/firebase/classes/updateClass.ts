import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";
import { NewClass } from "../../types/class.type";

export const updateClass = async (id: string, updates: NewClass) => {
  try {
    await updateDoc(doc(db, "classes", id), updates);
    toast.success("Class updated successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update MPR");
  }
};
