import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../firebase/auth/auth.provider";
import { useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";

/* eslint-disable react/react-in-jsx-scope */
export const ApprenticeDashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={s.overview}>
        <h2>{user?.name}&apos;s Dashboard</h2>
        <div className={s.totals}>
          <div>Hours</div>
          <div>Certs and Education</div>
          <div>Test</div>
        </div>
      </div>
      <div className={s.details}>
        <div className={s.hoursDetail}>
          Hours
          <button onClick={() => setIsModalOpen(true)}>Add hours</button>
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Hours">
            <AddHours />
          </Modal>
        </div>
      </div>
    </div>
  );
};
