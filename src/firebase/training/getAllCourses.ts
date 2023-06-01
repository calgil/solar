import { collection, onSnapshot, query } from "firebase/firestore";
import { Course } from "../../types/course.type";
import { db } from "../config";

export const getAllCourses = (
  setCourseData: (courses: Course[] | null) => void
) => {
  const coursesQuery = query(collection(db, "courses"));

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
