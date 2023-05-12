/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/Education.module.scss";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";
import { Course } from "../firebase/courses/addCourse";
import { getAllCourses } from "../firebase/courses/getAllCourses";

export const Education = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[] | null>(null);
  console.log({ allCourses });

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
          allCourses?.map((course) => (
            <div key={course.id}>
              <h4>{course.name}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};
