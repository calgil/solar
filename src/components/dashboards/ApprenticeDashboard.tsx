/* eslint-disable react/react-in-jsx-scope */
import s from "../../styles/components/ApprenticeDashboard.module.scss";
import { useAuth } from "../../providers/auth.provider";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { AddHours } from "../AddHours";
import { capitalizeName } from "../../utils/capitalizeName";
import { MprType } from "../../types/mpr.type";
import { HoursOverview } from "../HoursOverview";
import { HoursDetails } from "../HoursDetails";
import { fetchMprs } from "../../firebase/mpr/fetchMprs";
import { AddBtn } from "../AddBtn";
import { User } from "../../types/user.type";
import { AddUser } from "../AddUser";
import { Status } from "../Status";

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

  const closeModal = () => setIsModalOpen(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const closeEditModal = () => setIsEditModalOpen(false);

  const openEditModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const [userMprs, setUserMprs] = useState<MprType[]>([]);

  useEffect(() => {
    if (apprentice) {
      const unsubscribe = fetchMprs(apprentice.id, setUserMprs);
      return () => unsubscribe();
    }
  }, [apprentice]);

  const totalHours = userMprs.reduce((acc, mpr) => acc + mpr.totalHours, 0);
  const pvHours = userMprs.reduce((acc, mpr) => acc + mpr.psHours, 0);
  const oresHours = userMprs.reduce((acc, mpr) => acc + mpr.oresHours, 0);
  const bosHours = userMprs.reduce((acc, mpr) => acc + mpr.bosHours, 0);
  const otherHours = userMprs.reduce((acc, mpr) => acc + mpr.otherHours, 0);

  return (
    <div>
      <div className={s.overview}>
        <div className={s.userInfo}>
          <h2>{capitalizeName(apprentice.name)}&apos;s Dashboard</h2>
          {edit && user?.role !== "apprentice" && (
            <Status status={apprentice.status} />
          )}
        </div>
        <div className={s.totals}>
          <HoursOverview
            hours={{ totalHours, pvHours, oresHours, bosHours, otherHours }}
          />
          {/* <div>Certs and Education</div> */}
          {/* <div>Test</div> */}
        </div>
      </div>
      <div className={s.action}>
        {edit && user?.role === "admin" && (
          <button className={s.editBtn} onClick={openEditModal}>
            Edit Profile
          </button>
        )}
        <AddBtn text="Add Hours" onClick={openModal} />
      </div>
      <div className={s.details}>
        <HoursDetails
          apprenticeData={{
            totalHours,
            pvHours,
            otherReHours: oresHours,
            bosHours,
            otherHours,
            mprs: userMprs,
          }}
        />
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
