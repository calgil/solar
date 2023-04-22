import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export type MprType = {
  id?: string;
  userId: string;
  apprenticeName: string;
  date: firebase.firestore.Timestamp;
  photoUrl: string;
  psHours: number;
  oresHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
  supervisorId: string;
};
