import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export type MprType = {
  id: string;
  apprenticeId: string;
  apprenticeName: string;
  date: firebase.firestore.Timestamp;
  dateApproved: firebase.firestore.Timestamp;
  photoUrl: string;
  pvHours: number;
  otherREHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
  supervisorId: string;
};
