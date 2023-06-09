/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
import { DisplayStaff } from "../DisplayStaff";
import { MonthlyProgressReports } from "../MonthlyProgressReports";
import { Education } from "../Education";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type ActivePage = "staff" | "mprs" | "training";

export const AdminDashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>("staff");

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
  };

  const staffClass = cx({
    link: true,
    active: activePage === "staff",
  });

  const trainingClass = cx({
    link: true,
    active: activePage === "training",
  });

  const reportsClass = cx({
    link: true,
    active: activePage === "mprs",
  });

  return (
    <div className={s.container}>
      <div className={s.adminNav}>
        <h2 className={s.title} onClick={() => handlePageChange("staff")}>
          Administrator Dashboard
        </h2>
        <div className={s.links}>
          <a className={staffClass} onClick={() => handlePageChange("staff")}>
            Staff
          </a>
          <a
            className={trainingClass}
            onClick={() => handlePageChange("training")}
          >
            Related Trainings
          </a>
          <a className={reportsClass} onClick={() => handlePageChange("mprs")}>
            Monthly Progress Reports
          </a>
        </div>
      </div>
      {activePage === "staff" && <DisplayStaff />}
      {activePage === "mprs" && <MonthlyProgressReports />}
      {activePage === "training" && <Education />}
    </div>
  );
};
