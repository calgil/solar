export type RequiredHours = {
  totalHours: number;
  PSHours: number;
  BOSHours: number;
  ORESHours: number;
  otherHours: number;
};

export const REQUIRED_HOURS: RequiredHours = {
  totalHours: 4000,
  PSHours: 1000,
  BOSHours: 1500,
  ORESHours: 500,
  otherHours: 1000,
};
