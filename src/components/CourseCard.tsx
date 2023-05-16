/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Course } from "../firebase/courses/addCourse";
import s from "../styles/components/CourseCard.module.scss";
import { Modal } from "./Modal";
import { AddCourse } from "./AddCourse";

type CourseCardProps = {
  course: Course;
  edit?: boolean;
};

export const CourseCard = ({ course, edit }: CourseCardProps) => {
  const { name, hours, info, link, year } = course;
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <div className={s.course}>
      <div className={s.courseInfo}>
        <h3 className={s.name}>{name}</h3>
        <p className={s.hours}>{hours} Hours</p>
      </div>
      <div className={s.courseInfo}>
        {link && (
          <a
            className={s.link}
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            Learn More
          </a>
        )}
        {!link && <div></div>}
        <p className={s.year}>Year {year}</p>
      </div>
      <div className={`${s.courseInfo} ${s.settings}`}>
        <p className={s.info}>{info}</p>
        {edit && (
          <p className={s.edit} onClick={() => setIsEditOpen(true)}>
            Edit Course
          </p>
        )}
      </div>
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
