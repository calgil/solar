import firebase from "firebase/compat/app";
import { Course } from "./course.type";

export type UploadTraining = {
  apprenticeId: string;
  apprenticeName: string;
  courseCompleted: Course;
  dateCompleted: Date;
  photoUrl: string;
  photoPath: string;
  supervisorSignature: boolean;
  supervisorId: string;
  dateApproved: Date | null;
};

export type Training = {
  id: string;
  apprenticeId: string;
  apprenticeName: string;
  courseCompleted: Course;
  dateCompleted: firebase.firestore.Timestamp;
  photoUrl: string;
  photoPath: string;
  supervisorSignature: boolean;
  supervisorId: string;
  dateApproved: firebase.firestore.Timestamp;
};
