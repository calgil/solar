/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/CoursePage.module.scss";
import { Course } from "../types/course.type";
import { getAllCourses } from "../firebase/training/getAllCourses";
import { CourseCard } from "./CourseCard";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";
import { AddBtn } from "./AddBtn";

export const CoursePage = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllCourses(setAllCourses);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <div className={s.action}>
        <AddBtn text="Add Course" onClick={() => setIsAddCourseOpen(true)} />
      </div>
      <div>
        {allCourses && (
          <div className={s.courses}>
            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title="Add Course"
      >
        <AddCourse closeModal={() => setIsAddCourseOpen(false)} />
      </Modal>
    </div>
  );
};
