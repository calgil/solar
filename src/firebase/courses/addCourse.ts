import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { NewCourse } from "../../types/course.type";

export const addCourse = async (newCourse: NewCourse) => {
  if (!newCourse) {
    return;
  }
  const coursesRef = collection(db, "courses");
  try {
    await addDoc(coursesRef, newCourse);
  } catch (error) {
    console.error(error);
    throw new Error("could not create course");
  }
};
