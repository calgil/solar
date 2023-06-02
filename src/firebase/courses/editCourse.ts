import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { NewCourse } from "../../types/course.type";

export const editCourse = async (id: string, updates: NewCourse) => {
  const courseRef = doc(db, "courses", id);
  await updateDoc(courseRef, updates);
};
