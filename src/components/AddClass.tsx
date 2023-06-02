/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddClass.module.scss";
import { addClass } from "../firebase/training/addClass";
import { toast } from "react-toastify";
import { Class, NewClass } from "../types/class.type";
import { getAllCourses } from "../firebase/training/getAllCourses";
import { Course } from "../types/course.type";
import { MultiSelect } from "react-multi-select-component";

type AddClassProps = {
  closeModal: () => void;
  classToEdit?: Class;
};

export type Option = {
  label: string;
  value: string;
};

export const AddClass = ({ closeModal, classToEdit }: AddClassProps) => {
  const [className, setClassName] = useState(
    classToEdit?.name ? classToEdit.name : ""
  );
  const [classHours, setClassHours] = useState(
    classToEdit?.hours ? classToEdit.hours : 0
  );

  const [allCourses, setAllCourses] = useState<Course[] | null>(null);

  const [selectedCourses, setSelectedCourses] = useState<Option[]>([]);

  const options: Option[] = allCourses
    ? allCourses?.map((course) => ({ label: course.name, value: course.id }))
    : [];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(e.target.value);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassHours(+e.target.value);
  };

  const createNewClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!className || !classHours || !selectedCourses) {
      return;
    }
    const newClass: NewClass = {
      name: className,
      hours: classHours,
      options: selectedCourses,
      classRequirements: selectedCourses.map((course) => course.value),
    };

    console.log({ newClass });

    try {
      await addClass(newClass);
      toast.success("Class added successfully");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Could not create class");
    }
  };
  useEffect(() => {
    const unsubscribe = getAllCourses(setAllCourses);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log({ selectedCourses });
  }, [selectedCourses]);
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
      <label className={s.label}>
        Course Option
        {allCourses && (
          <MultiSelect
            options={options}
            value={selectedCourses}
            onChange={setSelectedCourses}
            labelledBy="Select"
          />
        )}
      </label>
      <input
        className={s.submitBtn}
        type="submit"
        value={classToEdit ? "Edit Class" : "Add Class"}
      />
    </form>
  );
};
