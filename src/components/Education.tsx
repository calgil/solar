/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/Education.module.scss";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";
import { Course } from "../firebase/courses/addCourse";
import { getAllClasses } from "../firebase/courses/getAllClasses";
import { CourseCard } from "./ClassCard";
import { AddClass } from "./AddClass";

export const Education = () => {
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [allClasses, setAllClasses] = useState<Course[] | null>(null);

  useEffect(() => {
    const unsubscribe = getAllClasses(setAllClasses);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <h3 className={s.courseTitle}>All Related Trainings</h3>
      <button className={s.filterBtn} onClick={() => setIsAddClassOpen(true)}>
        Add Class
      </button>
      <Modal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        title="Add Class"
      >
        <AddClass closeModal={() => setIsAddClassOpen(false)} />
        {/* <AddCourse closeModal={() => setIsAddCourseOpen(false)} /> */}
      </Modal>
      <div className={s.courses}>
        {allClasses &&
          allClasses.map((course) => (
            <CourseCard key={course.id} course={course} edit />
          ))}
      </div>
    </div>
  );
};
