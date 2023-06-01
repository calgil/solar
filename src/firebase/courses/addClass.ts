import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export type Class = {
  id: string;
  name: string;
  hours: number;
};

export type NewClass = {
  name: string;
  hours: number;
};

export const addClass = async (newClass: NewClass) => {
  console.log({ newClass });
  if (!newClass) {
    return;
  }
  const newClassRef = doc(collection(db, "classes"));
  try {
    await setDoc(newClassRef, newClass);
  } catch (error) {
    console.error(error);
    throw new Error("could not create class");
  }
};
