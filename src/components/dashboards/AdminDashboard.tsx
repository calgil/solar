/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
import { DisplayStaff } from "../DisplayStaff";
import { MonthlyProgressReports } from "../MonthlyProgressReports";
import { AddBtn } from "../AddBtn";
import { Modal } from "../Modal";
import { AddUser } from "../AddUser";
import { ArchivedUsers } from "../ArchivedUsers";

type ActivePage = "staff" | "mprs" | "archive";

export const AdminDashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>("staff");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
  };

  return (
    <div className={s.container}>
      <div className={s.adminNav}>
        <h2 className={s.title} onClick={() => handlePageChange("staff")}>
          Administrator Dashboard
        </h2>
        <div className={s.links}>
          <a className={s.link} onClick={() => handlePageChange("mprs")}>
            Monthly Progress Reports
          </a>
          <a className={s.link} onClick={() => handlePageChange("archive")}>
            Archived Users
          </a>
          <AddBtn text="Add User" onClick={() => setIsModalOpen(true)} />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add User"
        >
          <AddUser closeModal={() => setIsModalOpen(false)} />
        </Modal>
      </div>
      {activePage === "staff" && <DisplayStaff />}
      {activePage === "mprs" && <MonthlyProgressReports />}
      {activePage === "archive" && <ArchivedUsers />}
    </div>
  );
};
