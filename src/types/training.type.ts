import firebase from "firebase/compat/app";
import { Course } from "./course.type";

export type UploadTraining = {
  apprenticeId: string;
  courseCompleted: Course;
  dateCompleted: Date;
  supervisorSignature: boolean;
  supervisorId: string;
  dateApproved: Date | null;
};

export type Training = {
  id: string;
  apprenticeId: string;
  courseCompleted: Course;
  dateCompleted: firebase.firestore.Timestamp;
  supervisorSignature: boolean;
  supervisorId: string;
  dateApproved: firebase.firestore.Timestamp;
};
