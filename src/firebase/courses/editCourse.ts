import { doc, updateDoc } from "firebase/firestore";
import { NewCourse } from "./addCourse";
import { db } from "../config";

export const editCourse = async (id: string, updates: NewCourse) => {
  const courseRef = doc(db, "courses", id);
  await updateDoc(courseRef, updates);
};
