/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/Education.module.scss";
import { CoursePage } from "./CoursePage";
import { ClassPage } from "./ClassPage";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type ActivePage = "requirements" | "courses";

export const Education = () => {
  const [activePage, setActivePage] = useState<ActivePage>("requirements");

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
  };

  const requirementsClass = cx({
    link: true,
    active: activePage === "requirements",
  });

  const coursesClass = cx({
    link: true,
    active: activePage === "courses",
  });

  return (
    <div>
      <div className={s.links}>
        <a
          className={requirementsClass}
          onClick={() => handlePageChange("requirements")}
        >
          All Related Trainings
        </a>
        <a className={coursesClass} onClick={() => handlePageChange("courses")}>
          All Courses
        </a>
      </div>

      <div className={s.page}>
        {activePage === "requirements" && <ClassPage />}
        {activePage === "courses" && <CoursePage />}
      </div>
    </div>
  );
};
