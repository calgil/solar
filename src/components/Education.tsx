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
  const [allTrainings, setAllTrainings] = useState<Course[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllCourses(setAllTrainings);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <h3 className={s.courseTitle}>All Related Trainings</h3>
      <button className={s.filterBtn} onClick={() => setIsAddCourseOpen(true)}>
        Add Related Training Course
      </button>
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title="Add Course"
      >
        <AddCourse closeModal={() => setIsAddCourseOpen(false)} />
      </Modal>
      <div className={s.courses}>
        {allTrainings &&
          allTrainings.map((course) => (
            <CourseCard key={course.id} course={course} edit />
          ))}
      </div>
    </div>
  );
};
