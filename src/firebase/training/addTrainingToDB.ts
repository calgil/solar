import "firebase/compat/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { UploadTraining } from "../../types/training.type";

export const addTrainingToDB = async (newTraining: UploadTraining) => {
  try {
    await addDoc(collection(db, "trainings"), newTraining);
  } catch (error) {
    console.error(error);
    throw new Error("Could not add training to firebase");
  }
};
