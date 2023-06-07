/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/AddCourse.module.scss";
import { addCourse } from "../firebase/courses/addCourse";
import { toast } from "react-toastify";
import { editCourse } from "../firebase/courses/editCourse";
import { Course, NewCourse } from "../types/course.type";

type AddCourseProps = {
  // classId: string;
  closeModal: () => void;
  courseToEdit?: Course;
};

export const AddCourse = ({
  // classId,
  closeModal,
  courseToEdit,
}: AddCourseProps) => {
  const [courseName, setCourseName] = useState(
    courseToEdit?.name ? courseToEdit.name : ""
  );
  const [courseLink, setCourseLink] = useState(
    courseToEdit?.link ? courseToEdit.link : ""
  );
  const [courseInfo, setCourseInfo] = useState(
    courseToEdit?.info ? courseToEdit.info : ""
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseLink(e.target.value);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCourseInfo(e.target.value);
  };

  const createNewCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseName) {
      return;
    }

    if (courseToEdit) {
      const updates: NewCourse = {
        name: courseName,
        link: courseLink,
        info: courseInfo,
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
      // classId,
      name: courseName,
      link: courseLink,
      info: courseInfo,
    };
    console.log({ newCourse });

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
      <input
        className={s.submitBtn}
        type="submit"
        value={courseToEdit ? "Edit Course" : "Add Course"}
      />
    </form>
  );
};
