import { Course } from "./course.type";

export type Class = {
  id: string;
  name: string;
  hours: number;
  courses: Course[];
};

export type NewClass = {
  name: string;
  hours: number;
};
