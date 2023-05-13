import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export type UploadTraining = {
  apprenticeId: string;
  courseId: string;
  courseName: string;
  hours: number;
  dateCompleted: Date;
  supervisorApproval: boolean;
};

export type Training = {
  id: string;
  apprenticeId: string;
  courseId: string;
  courseName: string;
  hours: number;
  dateCompleted: firebase.firestore.Timestamp;
  supervisorApproval: boolean;
};

export const addTraining = async (newTraining: UploadTraining) => {
  try {
    await addDoc(collection(db, "trainings"), newTraining);
  } catch (error) {
    console.error(error);
    throw new Error("Could not add training to firebase");
  }
};
