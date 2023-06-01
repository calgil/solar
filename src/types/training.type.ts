import firebase from "firebase/compat/app";

export type UploadTraining = {
  apprenticeId: string;
  classId: string;
  courseId: string;
  courseName: string;
  dateCompleted: Date;
};

export type Training = {
  id: string;
  classId: string;
  apprenticeId: string;
  courseId: string;
  courseName: string;
  dateCompleted: firebase.firestore.Timestamp;
};
