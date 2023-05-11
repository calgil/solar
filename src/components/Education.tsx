/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/Education.module.scss";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";

export const Education = () => {
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
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
        <AddCourse />
      </Modal>
    </div>
  );
};
