import firebase from "firebase/compat/app";

export type UploadTraining = {
  apprenticeId: string;
  courseId: string;
  courseName: string;
  dateCompleted: Date;
};

export type Training = {
  id: string;
  apprenticeId: string;
  courseId: string;
  courseName: string;
  dateCompleted: firebase.firestore.Timestamp;
};
