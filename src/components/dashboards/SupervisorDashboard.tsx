/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../../styles/components/SupervisorDashboard.module.scss";
import { User } from "../../types/user.type";
import { fetchUsers } from "../../firebase/users/fetchUsers";
import { useAuth } from "../../providers/auth.provider";
import { StaffMember } from "../StaffMember";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { AddBtn } from "../AddBtn";
import { fetchUserData } from "../../firebase/users/fetchUserById";
import { AddUser } from "../AddUser";
import { AddTraining } from "../AddTraining";
import { capitalizeName } from "../../utils/capitalizeName";

type SupervisorDashboardProps = {
  supervisorId: string;
  edit?: boolean;
};

export const SupervisorDashboard = ({
  supervisorId,
  edit,
}: SupervisorDashboardProps) => {
  const { user } = useAuth();

  const [supervisor, setSupervisor] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [apprentices, setApprentices] = useState<User[]>([]);

  const openEditModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const getApprentices = async () => {
    if (!supervisor) {
      return;
    }
    const apprentices = await fetchUsers("apprentice", supervisor.id);

    setApprentices(apprentices);
  };

  useEffect(() => {
    if (supervisor) {
      getApprentices();
    }
  }, [supervisor]);

  useEffect(() => {
    if (supervisorId) {
      const unsubscribe = fetchUserData(supervisorId, setSupervisor);

      return () => unsubscribe();
    }
  }, []);

  return (
    <>
      {supervisor && (
        <div className={s.apprenticeSummary}>
          <h2 className={s.title}>
            {capitalizeName(supervisor.name)}&apos;s Apprentice Summary
          </h2>
          <div className={s.action}>
            {edit && user?.role === "admin" && (
              <AddBtn text="Edit Profile" onClick={openEditModal} />
            )}
            {user?.role === "supervisor" && (
              <>
                <button
                  className={s.addTraining}
                  onClick={() => setIsTrainingOpen(true)}
                >
                  Add Related Training
                </button>
                <AddBtn text="Add Hours" onClick={() => setIsModalOpen(true)} />
              </>
            )}
          </div>
          <div className={s.apprenticeContainer}>
            {apprentices.map((app) => (
              <StaffMember key={app.id} user={app} />
            ))}
          </div>
          <Modal
            isOpen={isTrainingOpen}
            onClose={() => setIsTrainingOpen(false)}
            title="Add Related Training"
          >
            <AddTraining
              closeModal={() => setIsTrainingOpen(false)}
              apprentices={apprentices}
              supervisor
            />
          </Modal>
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Edit ${supervisor.name}'s Profile`}
          >
            {apprentices.length > 0 ? (
              <div>Cannot Edit Supervisor while they have apprentices</div>
            ) : (
              <AddUser
                closeModal={() => setIsEditModalOpen(false)}
                userToEdit={supervisor}
              />
            )}
          </Modal>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Add Apprentice Hours"
          >
            {user && (
              <AddHours
                user={user}
                closeModal={closeModal}
                supervisor="supervisor"
                apprentices={apprentices}
              />
            )}
          </Modal>
        </div>
      )}
    </>
  );
};
