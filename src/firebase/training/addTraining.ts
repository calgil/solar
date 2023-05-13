import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export type uploadTraining = {
  apprenticeId: string;
  courseId: string;
  courseName: string;
  hours: number;
  dateCompleted: Date;
  supervisorApproval: boolean;
};

export const addTraining = async (newTraining: uploadTraining) => {
  try {
    await addDoc(collection(db, "trainings"), newTraining);
  } catch (error) {
    console.error(error);
    throw new Error("Could not add training to firebase");
  }
};
