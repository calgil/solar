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
import {
  TrainingData,
  fetchApprenticeTrainingData,
} from "../../firebase/courses/fetchApprenticeTrainingData";
import { TrainingOverview } from "../TrainingOverview";
import { TrainingDetails } from "../TrainingDetails";
import { AddTraining } from "../AddTraining";

type ApprenticeDashboardProps = {
  apprenticeId: string;
  edit?: boolean;
};

export const ApprenticeDashboard = ({
  apprenticeId,
  edit,
}: ApprenticeDashboardProps) => {
  const { user } = useAuth();
  const [isAddHoursOpen, setIsAddHoursOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [apprentice, setApprentice] = useState<User | null>(null);
  const [apprenticeData, setApprenticeData] = useState<ApprenticeData | null>(
    null
  );
  const [apprenticeTrainingData, setApprenticeTrainingData] =
    useState<TrainingData | null>(null);
  const [currentSupervisor, setCurrentSupervisor] = useState<User | null>(null);

  const { supervisors } = useUsers();

  const closeModal = () => setIsAddHoursOpen(false);

  const openHoursModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsAddHoursOpen(true);
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
      const unsubscribe = fetchApprenticeTrainingData(
        apprenticeId,
        setApprenticeTrainingData
      );
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
        <>
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
              {!apprenticeData && (
                <HoursOverview
                  hours={{
                    totalHours: 0,
                    pvHours: 0,
                    otherREHours: 0,
                    bosHours: 0,
                    otherHours: 0,
                    hasUnapprovedMpr: false,
                    mprs: [],
                  }}
                />
              )}
              {apprenticeData && <HoursOverview hours={apprenticeData.data} />}
              {apprenticeTrainingData && (
                <TrainingOverview
                  totalHours={apprenticeTrainingData.totalHours}
                />
              )}
            </div>
          </div>
          <div className={s.action}>
            {edit && user?.role === "admin" && (
              <AddBtn text="Edit Status" onClick={openEditModal} />
            )}
            {user?.role === "apprentice" && (
              <>
                <AddBtn text="Add Hours" onClick={openHoursModal} />
                <Modal
                  isOpen={isAddHoursOpen}
                  onClose={closeModal}
                  title="Add Hours"
                >
                  {user && <AddHours user={user} closeModal={closeModal} />}
                </Modal>
                <button
                  className={s.trainingBtn}
                  onClick={() => setIsTrainingOpen(true)}
                >
                  Add Training
                </button>
                <Modal
                  isOpen={isTrainingOpen}
                  onClose={() => setIsTrainingOpen(false)}
                  title="Add Related Training"
                >
                  <AddTraining
                    closeModal={() => setIsTrainingOpen(false)}
                    supervisor={false}
                    apprentice={user}
                  />
                </Modal>
              </>
            )}
          </div>
          <div className={s.details}>
            {!apprenticeData && (
              <HoursDetails
                apprenticeData={{
                  totalHours: 0,
                  pvHours: 0,
                  otherREHours: 0,
                  bosHours: 0,
                  otherHours: 0,
                  hasUnapprovedMpr: false,
                  mprs: [],
                }}
              />
            )}
            {apprenticeData && (
              <HoursDetails apprenticeData={apprenticeData.data} />
            )}
            {apprenticeTrainingData && (
              <TrainingDetails data={apprenticeTrainingData} />
            )}
          </div>
          <Modal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            title={`Edit ${apprentice.name}'s Profile`}
          >
            <AddUser closeModal={closeEditModal} userToEdit={apprentice} />
          </Modal>
        </>
      )}
    </>
  );
};
