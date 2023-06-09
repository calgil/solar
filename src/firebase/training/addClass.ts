import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { NewClass } from "../../types/class.type";

export const addClass = async (newClass: NewClass) => {
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
