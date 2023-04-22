/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
import { Staff } from "../Staff";
import { MonthlyProgressReports } from "../MonthlyProgressReports";

export const AdminDashboard = () => {
  const [showAllMprs, setShowAllMprs] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.adminNav}>
        <h2 className={s.title} onClick={() => setShowAllMprs(false)}>
          Administrator Dashboard
        </h2>
        <div className={s.links}>
          <a className={s.link} onClick={() => setShowAllMprs(true)}>
            Monthly Progress Reports
          </a>
        </div>
      </div>
      {showAllMprs && <MonthlyProgressReports />}
      {!showAllMprs && <Staff />}
    </div>
  );
};
