/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/AddClass.module.scss";
import { addClass } from "../firebase/training/addClass";
import { toast } from "react-toastify";
import { Class, NewClass } from "../types/class.type";
import { getAllCourses } from "../firebase/training/getAllCourses";
import { Course } from "../types/course.type";

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

  const [allCourses, setAllCourses] = useState<Course[] | null>(null);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedCourses((prevSelectedCourses) => {
      const updatedSelectedCourses = prevSelectedCourses.filter(
        (course) => !selectedValues.includes(course)
      );

      selectedValues.forEach((value) => {
        if (!updatedSelectedCourses.includes(value)) {
          updatedSelectedCourses.push(value);
        }
      });

      return updatedSelectedCourses;
    });
  };

  const createNewClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!className || !classHours || !selectedCourses) {
      return;
    }
    const newClass: NewClass = {
      name: className,
      hours: classHours,
      courseIds: selectedCourses,
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
        Acceptable Courses
        <select
          className={s.input}
          multiple
          value={selectedCourses}
          onChange={handleOptionChange}
        >
          {allCourses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {selectedCourses && (
          <p> Selected Courses: {selectedCourses.join(", ")}</p>
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
