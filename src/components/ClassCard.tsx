/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/ClassCard.module.scss";
import { Modal } from "./Modal";
import { AddClass } from "./AddClass";
import { Class } from "../types/class.type";

type ClassCardProps = {
  training: Class;
  edit?: boolean;
};

export const ClassCard = ({ training }: ClassCardProps) => {
  const { name, hours, options } = training;

  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className={s.class}>
      <div className={s.classInfo}>
        <div className={s.classDetails}>
          <h3 className={s.name}>{name}</h3>
          <p className={s.hours}>{hours} Hours</p>
        </div>
        <div className={s.btnContainer}>
          <a className={s.edit} onClick={() => setIsEditOpen(true)}>
            {"\u270E"} Edit
          </a>
        </div>
      </div>
      <div className={s.courses}>
        <h5 className={s.required}>One of the following is required:</h5>
        {options.map((course) => (
          <div className={s.course} key={course.value}>
            {" "}
            {course.label}{" "}
          </div>
        ))}
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit ${name}`}
      >
        <AddClass
          closeModal={() => setIsEditOpen(false)}
          classToEdit={training}
        />
      </Modal>
    </div>
  );
};
