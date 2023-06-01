/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/AddClass.module.scss";
import { Class, NewClass, addClass } from "../firebase/courses/addClass";
import { toast } from "react-toastify";

type AddClassProps = {
  closeModal: () => void;
  classToEdit?: Class;
};

export const AddClass = ({ closeModal, classToEdit }: AddClassProps) => {
  const [className, setClassName] = useState(
    classToEdit?.name ? classToEdit.name : ""
  );
  const [classHours, setClassHours] = useState(
    classToEdit?.hours ? classToEdit.hours : 0
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(e.target.value);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassHours(+e.target.value);
  };

  const createNewClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!className || !classHours) {
      return;
    }
    const newClass: NewClass = {
      name: className,
      hours: classHours,
    };

    try {
      await addClass(newClass);
      toast.success("Class added successfully");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Could not create class");
    }
  };
  return (
    <form onSubmit={createNewClass}>
      <label className={s.label}>
        Class Name
        <input
          className={s.input}
          name="className"
          type="text"
          onChange={handleNameChange}
          value={className}
          autoComplete="off"
        />
      </label>
      <label className={s.label}>
        Total Hours
        <input
          className={`${s.input} ${s.hourInput}`}
          name="hours"
          type="number"
          onChange={handleHourChange}
          value={classHours}
          autoComplete="off"
        />
      </label>
      <input
        className={s.submitBtn}
        type="submit"
        value={classToEdit ? "Edit Class" : "Add Class"}
      />
    </form>
  );
};
