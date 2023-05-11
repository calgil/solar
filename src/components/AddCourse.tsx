/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/AddCourse.module.scss";

export const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseHours, setCourseHours] = useState(0);
  const [courseLink, setCourseLink] = useState("");
  const [courseInfo, setCourseInfo] = useState("");

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

  const addCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("course", { courseName, courseLink, courseHours, courseInfo });
  };
  return (
    <form onSubmit={addCourse}>
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
          autoFocus
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
