/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/AddCourse.module.scss";
import { Course, NewCourse, addCourse } from "../firebase/courses/addCourse";
import { toast } from "react-toastify";
import { editCourse } from "../firebase/courses/editCourse";

type AddCourseProps = {
  closeModal: () => void;
  courseToEdit?: Course;
};

export const AddCourse = ({ closeModal, courseToEdit }: AddCourseProps) => {
  const [courseYear, setCourseYear] = useState(
    courseToEdit?.year ? courseToEdit.year : 0
  );
  const [courseName, setCourseName] = useState(
    courseToEdit?.name ? courseToEdit.name : ""
  );
  const [courseHours, setCourseHours] = useState(
    courseToEdit?.hours ? courseToEdit.hours : 0
  );
  const [courseLink, setCourseLink] = useState(
    courseToEdit?.link ? courseToEdit.link : ""
  );
  const [courseInfo, setCourseInfo] = useState(
    courseToEdit?.info ? courseToEdit.info : ""
  );

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseYear(+e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCourseHours(+e.target.value);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCourseLink(e.target.value);
    }
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setCourseInfo(e.target.value);
    }
  };

  const createNewCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseYear || !courseName || !courseHours) {
      return;
    }

    if (courseToEdit) {
      const updates: NewCourse = {
        year: courseYear,
        name: courseName,
        link: courseLink,
        info: courseInfo,
        hours: courseHours,
      };

      try {
        await editCourse(courseToEdit.id, updates);
        toast.success("Course updated");
        return closeModal();
      } catch (error) {
        console.error(error);
        toast.error("Could not update course");
        throw new Error("Could not update course");
      }
    }

    const newCourse: NewCourse = {
      year: courseYear,
      name: courseName,
      link: courseLink,
      info: courseInfo,
      hours: courseHours,
    };
    try {
      await addCourse(newCourse);
      toast.success("Course added successfully");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course");
    }
  };
  return (
    <form onSubmit={createNewCourse}>
      <label className={s.label} htmlFor="year">
        Year
        <select
          className={s.input}
          name="year"
          id="year"
          onChange={handleYearChange}
          value={courseYear}
        >
          <option value={0}>- Select Year</option>
          <option value={1}>1st Year</option>
          <option value={2}>2nd Year</option>
        </select>
      </label>
      <label className={s.label} htmlFor="courseName">
        Course Name
        <input
          id="courseName"
          className={s.input}
          name="courseName"
          type="text"
          onChange={handleNameChange}
          placeholder="Course Name"
          value={courseName}
          autoComplete="off"
        />
      </label>

      <label className={s.label} htmlFor="link">
        Link
        <input
          className={s.input}
          type="text"
          placeholder="Course url"
          onChange={handleLinkChange}
          value={courseLink}
          autoComplete="off"
        />
      </label>
      <label className={s.label} htmlFor="info">
        Course Info
        <textarea
          name="info"
          id="info"
          className={s.input}
          onChange={handleInfoChange}
          value={courseInfo}
        ></textarea>
      </label>
      <label className={s.label} htmlFor="hours">
        Hours
        <input
          className={`${s.input} ${s.hourInput}`}
          type="number"
          onChange={handleHourChange}
          value={courseHours}
        />
      </label>
      <input
        className={s.submitBtn}
        type="submit"
        value={courseToEdit ? "Edit Course" : "Add Course"}
      />
    </form>
  );
};
