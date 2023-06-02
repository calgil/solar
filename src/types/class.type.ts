import { Option } from "../components/AddClass";

export type Class = {
  id: string;
  name: string;
  hours: number;
  options: Option[];
  classRequirements: string[];
};

export type NewClass = {
  name: string;
  hours: number;
  options: Option[];
  classRequirements: string[];
};
