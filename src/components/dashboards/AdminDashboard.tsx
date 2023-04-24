/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
import { Staff } from "../Staff";
import { MonthlyProgressReports } from "../MonthlyProgressReports";
import { AddBtn } from "../AddBtn";
import { useUsers } from "../../hooks/useUsers";
import { Modal } from "../Modal";
import { AddUser } from "../AddUser";

export const AdminDashboard = () => {
  const [showAllMprs, setShowAllMprs] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { users } = useUsers();

  const supervisors = users.filter((user) => user.role === "supervisor");

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
          <AddBtn text="Add User" onClick={() => setIsModalOpen(true)} />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add User"
        >
          <AddUser
            supervisors={supervisors}
            closeModal={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
      {showAllMprs && <MonthlyProgressReports />}
      {!showAllMprs && <Staff />}
    </div>
  );
};
