/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/CourseCard.module.scss";
import { Course } from "../types/course.type";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";

type CourseCardProps = {
  course: Course;
};

export const CourseCard = ({ course }: CourseCardProps) => {
  const { name, link, info, classId } = course;

  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div className={s.courseCard}>
      <div className={s.courseInfo}>
        <h4 className={s.courseName}>{name}</h4>
        {link && (
          <a className={s.link} href={link}>
            Learn more
          </a>
        )}
        {info && <span className={s.info}>{info} </span>}
      </div>
      <button className={s.editBtn} onClick={() => setIsEditOpen(true)}>
        {"\u270E"}
      </button>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit ${name}`}
      >
        <AddCourse
          classId={classId}
          closeModal={() => setIsEditOpen(false)}
          courseToEdit={course}
        />
      </Modal>
    </div>
  );
};
