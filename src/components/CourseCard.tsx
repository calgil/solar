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
  const { name, link, info } = course;

  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div className={s.courseCard}>
      <div className={s.text}>
        <div className={s.courseInfo}>
          <h4 className={s.courseName}>{name}</h4>
          {link && (
            <div>
              <a className={s.link} href={link}>
                Learn more
              </a>
            </div>
          )}
        </div>
        {info && <div className={s.info}>{info} </div>}
      </div>

      <button className={s.editBtn} onClick={() => setIsEditOpen(true)}>
        {"\u270E"} Edit
      </button>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit ${name}`}
      >
        <AddCourse
          closeModal={() => setIsEditOpen(false)}
          courseToEdit={course}
        />
      </Modal>
    </div>
  );
};
