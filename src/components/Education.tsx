/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/Education.module.scss";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";
import { Course } from "../firebase/courses/addCourse";
import { getAllCourses } from "../firebase/courses/getAllCourses";
import { CourseCard } from "./CourseCard";

export const Education = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllCourses(setAllCourses);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <h3 className={s.courseTitle}>All Courses</h3>
      <button className={s.filterBtn} onClick={() => setIsAddCourseOpen(true)}>
        Add Course
      </button>
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title="Add Course"
      >
        <AddCourse closeModal={() => setIsAddCourseOpen(false)} />
      </Modal>
      <div className={s.courses}>
        {allCourses &&
          allCourses.map((course) => (
            <CourseCard key={course.id} course={course} edit />
          ))}
      </div>
    </div>
  );
};
