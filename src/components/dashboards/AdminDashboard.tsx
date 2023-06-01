/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
import { DisplayStaff } from "../DisplayStaff";
import { MonthlyProgressReports } from "../MonthlyProgressReports";
import { AddBtn } from "../AddBtn";
import { Modal } from "../Modal";
import { AddUser } from "../AddUser";
import { Education } from "../Education";
import { AddTraining } from "../AddTraining";
import { useUsers } from "../../hooks/useUsers";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type ActivePage = "staff" | "mprs" | "training";

export const AdminDashboard = () => {
  const [activePage, setActivePage] = useState<ActivePage>("staff");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  const { apprentices } = useUsers();

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
  };

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
          <a
            className={trainingClass}
            onClick={() => handlePageChange("training")}
          >
            Related Trainings
          </a>
          <a className={reportsClass} onClick={() => handlePageChange("mprs")}>
            Monthly Progress Reports
          </a>
          <button
            className={s.addTraining}
            onClick={() => setIsTrainingOpen(true)}
          >
            Add Related Training
          </button>
          <AddBtn text="Add User" onClick={() => setIsModalOpen(true)} />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add User"
        >
          <AddUser closeModal={() => setIsModalOpen(false)} />
        </Modal>
        <Modal
          isOpen={isTrainingOpen}
          onClose={() => setIsTrainingOpen(false)}
          title="Add Related Training"
        >
          <AddTraining
            closeModal={() => setIsTrainingOpen(false)}
            apprentices={apprentices.filter((app) => app.status === "active")}
          />
        </Modal>
      </div>
      {activePage === "staff" && <DisplayStaff />}
      {activePage === "mprs" && <MonthlyProgressReports />}
      {activePage === "training" && <Education />}
    </div>
  );
};
