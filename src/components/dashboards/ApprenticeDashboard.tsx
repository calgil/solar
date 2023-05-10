/* eslint-disable react/react-in-jsx-scope */
import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../providers/auth.provider";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { capitalizeName } from "../../utils/capitalizeName";
import { HoursOverview } from "../HoursOverview";
import { HoursDetails } from "../HoursDetails";
import { fetchApprenticeData } from "../../firebase/mpr/fetchApprenticeData";
import { AddBtn } from "../AddBtn";
import { User } from "../../types/user.type";
import { AddUser } from "../AddUser";
import { Status } from "../Status";
import { useUsers } from "../../hooks/useUsers";
import { ApprenticeData } from "../../firebase/mpr/getApprenticeData";
import { fetchUserData } from "../../firebase/users/fetchUserById";

type ApprenticeDashboardProps = {
  apprenticeId: string;
  edit?: boolean;
};

export const ApprenticeDashboard = ({
  apprenticeId,
  edit,
}: ApprenticeDashboardProps) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apprentice, setApprentice] = useState<User | null>(null);
  const [apprenticeData, setApprenticeData] = useState<ApprenticeData | null>(
    null
  );
  const [currentSupervisor, setCurrentSupervisor] = useState<User | null>(null);

  const { supervisors } = useUsers();

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
      const supervisor = supervisors.find(
        (supervisor) => supervisor.id === apprentice.supervisorId
      );
      if (supervisor) {
        setCurrentSupervisor(supervisor);
      }
      if (!supervisor) {
        setCurrentSupervisor(null);
      }
    }
  }, [apprentice, supervisors]);

  useEffect(() => {
    if (apprenticeId) {
      const unsubscribe = fetchUserData(apprenticeId, setApprentice);
      return () => unsubscribe();
    }
  }, [apprenticeId]);

  useEffect(() => {
    if (apprenticeId) {
      const unsubscribe = fetchApprenticeData(apprenticeId, setApprenticeData);
      return () => unsubscribe();
    }
  }, [apprenticeId]);

  return (
    <>
      {apprentice && (
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
      )}
    </>
  );
};
