export type RequiredHours = {
  totalHours: number;
  PVHours: number;
  BOSHours: number;
  OtherREHours: number;
  otherHours: number;
  trainingTotal: number;
};

export const REQUIRED_HOURS: RequiredHours = {
  totalHours: 4000,
  PVHours: 1000,
  BOSHours: 1500,
  OtherREHours: 500,
  otherHours: 1000,
  trainingTotal: 288,
};
