/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../../styles/components/SupervisorDashboard.module.scss";
import { User } from "../../types/user.type";
import { fetchUsers } from "../../firebase/users/fetchUsers";
import { useAuth } from "../../firebase/auth/auth.provider";
import { StaffMember } from "../StaffMember";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";

export const SupervisorDashboard = () => {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apprentices, setApprentices] = useState<User[]>([]);

  const closeModal = () => setIsModalOpen(false);

  const getApprentices = async () => {
    if (!user) {
      return;
    }
    const apprenticeData = await fetchUsers(user.id);
    setApprentices(apprenticeData);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getApprentices();
  }, [user]);

  return (
    <div className={s.apprenticeSummary}>
      <div className={s.actions}>
        <h2 className={s.title}>Apprentice Summary</h2>
        <a className={s.link} onClick={() => setIsModalOpen(true)}>
          Add Hours
        </a>
      </div>
      <div className={s.apprenticeContainer}>
        {apprentices.map((app) => (
          <StaffMember key={app.id} user={app} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Apprentice Hours"
      >
        {user && (
          <AddHours
            user={user}
            closeModal={closeModal}
            supervisor
            apprentices={apprentices}
          />
        )}
      </Modal>
    </div>
  );
};
