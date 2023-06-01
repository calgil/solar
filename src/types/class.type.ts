export type Class = {
  id: string;
  name: string;
  hours: number;
  courseIds: string[];
};

export type NewClass = {
  name: string;
  hours: number;
  courseIds: string[];
};
