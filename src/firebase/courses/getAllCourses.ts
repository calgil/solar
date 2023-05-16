import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config";
import { Course } from "./addCourse";

export const getAllCourses = (
  setCourseData: (courses: Course[] | null) => void
) => {
  const coursesQuery = query(
    collection(db, "courses"),
    orderBy("year"),
    orderBy("name")
  );

  const unsubscribe = onSnapshot(coursesQuery, (coursesSnapshot) => {
    const courses = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
    if (courses.length === 0) {
      return setCourseData(null);
    }
    setCourseData(courses);
  });
  return unsubscribe;
};
