import { useEffect, useState } from "react";
import s from "../styles/components/CoursePage.module.scss";
import { Course } from "../types/course.type";
import { getAllCourses } from "../firebase/training/getAllCourses";
import plus from "../assets/plus.png";
import { CourseCard } from "./CourseCard";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";

/* eslint-disable react/react-in-jsx-scope */
export const CoursePage = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllCourses(setAllCourses);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <button className={s.filterBtn} onClick={() => setIsAddCourseOpen(true)}>
        <div className={s.plus}>
          <img className={s.plusImg} src={plus} alt="plus" />
        </div>
        Add Course
      </button>
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
