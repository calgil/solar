import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export type UploadMpr = {
  id?: string;
  apprenticeId: string;
  apprenticeName: string;
  date: Date;
  dateApproved: Date | null;
  photoUrl: string;
  photoPath: string;
  pvHours: number;
  otherREHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
  supervisorId: string;
};

export type MprType = {
  id: string;
  apprenticeId: string;
  apprenticeName: string;
  date: firebase.firestore.Timestamp;
  dateApproved: firebase.firestore.Timestamp;
  photoUrl: string;
  photoPath: string;
  pvHours: number;
  otherREHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
  supervisorId: string;
};
