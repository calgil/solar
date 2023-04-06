export type mprType = {
  id?: string;
  userId: string;
  username: string;
  date: Date;
  photoUrl: string;
  psHours: number;
  resHours: number;
  bosHours: number;
  otherHours: number;
  totalHours: number;
  apprenticeSignature: boolean;
  supervisorSignature: boolean;
};
