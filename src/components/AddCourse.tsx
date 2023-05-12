/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/AddCourse.module.scss";
import { NewCourse, addCourse } from "../firebase/courses/addCourse";
import { toast } from "react-toastify";

type AddCourseProps = {
  closeModal: () => void;
};

export const AddCourse = ({ closeModal }: AddCourseProps) => {
  const [courseYear, setCourseYear] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [courseHours, setCourseHours] = useState(0);
  const [courseLink, setCourseLink] = useState("");
  const [courseInfo, setCourseInfo] = useState("");

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
      console.log("no data");
      return;
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
      <input className={s.submitBtn} type="submit" value="Add Course" />
    </form>
  );
};
