/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Course } from "../firebase/courses/addCourse";
import s from "../styles/components/ClassCard.module.scss";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";
import { AddClass } from "./AddClass";
import plus from "../assets/plus.png";

type ClassCardProps = {
  course: Course;
  edit?: boolean;
};

export const CourseCard = ({ course, edit }: ClassCardProps) => {
  const { name, hours } = course;
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div className={s.class}>
      <div className={s.classInfo}>
        <div className={s.classDetails}>
          <h3 className={s.name}>{name}</h3>
          <p className={s.hours}>{hours} Hours</p>
        </div>
        <div className={s.btnContainer}>
          <button className={s.add}>
            <div className={s.plus}>
              <img className={s.plusImg} src={plus} alt="plus" />
            </div>
            Add Course
          </button>
          <button className={s.edit} onClick={() => setIsEditOpen(true)}>
            Edit
          </button>
        </div>
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit ${name}`}
      >
        <AddClass
          closeModal={() => setIsEditOpen(false)}
          classToEdit={course}
        />
      </Modal>
    </div>
  );
};
