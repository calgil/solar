export type mprType = {
  id?: string;
  userId: string;
  username: string;
  date:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | Date;
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
