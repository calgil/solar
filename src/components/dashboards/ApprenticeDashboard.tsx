/* eslint-disable react/react-in-jsx-scope */
import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../providers/auth.provider";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { capitalizeName } from "../../utils/capitalizeName";
import { HoursOverview } from "../HoursOverview";
import { HoursDetails } from "../HoursDetails";
import { fetchApprenticeData } from "../../firebase/mpr/fetchMprs";
import { AddBtn } from "../AddBtn";
import { User } from "../../types/user.type";
import { AddUser } from "../AddUser";
import { Status } from "../Status";
import { useUsers } from "../../hooks/useUsers";
import { ApprenticeData } from "../../firebase/mpr/getApprenticeData";

type ApprenticeDashboardProps = {
  apprentice: User;
  edit?: boolean;
};

export const ApprenticeDashboard = ({
  apprentice,
  edit,
}: ApprenticeDashboardProps) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apprenticeData, setApprenticeData] = useState<ApprenticeData | null>(
    null
  );

  const { supervisors } = useUsers();

  const currentSupervisor = supervisors.find(
    (supervisor) => supervisor.id === apprentice.supervisorId
  );

  const closeModal = () => setIsModalOpen(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const openEditModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (apprentice) {
      const unsubscribe = fetchApprenticeData(apprentice.id, setApprenticeData);
      return () => unsubscribe();
    }
  }, [apprentice]);

  return (
    <div>
      <div className={s.overview}>
        <div className={s.userInfo}>
          <h2>{capitalizeName(apprentice.name)}&apos;s Dashboard</h2>
          {edit && user?.role !== "apprentice" && (
            <div className={s.apprenticeInfo}>
              <Status status={apprentice.status} />
              <span>Supervisor: {currentSupervisor?.name}</span>
            </div>
          )}
        </div>
        <div className={s.totals}>
          {apprenticeData?.data && (
            <HoursOverview hours={apprenticeData.data} />
          )}
          {/* <div>Certs and Education</div> */}
          {/* <div>Test</div> */}
        </div>
      </div>
      <div className={s.action}>
        {edit && user?.role === "admin" && (
          <AddBtn text="Edit Profile" onClick={openEditModal} />
        )}
        {user?.role === "apprentice" && (
          <AddBtn text="Add Hours" onClick={openModal} />
        )}
      </div>
      <div className={s.details}>
        {apprenticeData?.data && (
          <HoursDetails apprenticeData={apprenticeData.data} />
        )}
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          title={`Edit ${apprentice.name}'s Profile`}
        >
          <AddUser closeModal={closeEditModal} userToEdit={apprentice} />
        </Modal>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Hours">
          {user && <AddHours user={user} closeModal={closeModal} />}
        </Modal>
      </div>
    </div>
  );
};
