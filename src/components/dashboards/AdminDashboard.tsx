/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
import { AddUser } from "../AddUser";
import { Modal } from "../Modal";
export const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Administrator Dashboard</h2>
      <div className={s.adminActions}>
        <button>Filter</button>
        <input type="text" placeholder="Filter Staff" />
        <button onClick={() => setIsModalOpen(true)}>Add User</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New User">
          <AddUser />
        </Modal>
      </div>
    </div>
  );
};
