/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { REQUIRED_HOURS } from "../data/hourRequirements";
import s from "../styles/components/MprDisplay.module.scss";
import { MprType } from "../types/mpr.type";
import { displayDate } from "../utils/displayDate";
import { HourCategory } from "./HourCategory";
import { Signature } from "./Signature";
import { useAuth } from "../providers/auth.provider";
import { AddHours } from "./AddHours";
import { Modal } from "./Modal";

type MprDetailsProps = {
  mpr: MprType;
};

export const MprDisplay = ({ mpr }: MprDetailsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { user } = useAuth();

  const openModal = () => {
    setIsEditOpen(true);
  };
  return (
    <div
      className={s.mprDetails}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation()
      }
    >
      <div className={s.hoursContainer}>
        <p className={s.date}>{displayDate(mpr.date)}</p>
        <p className={s.totalHours}>{mpr.totalHours} Hours</p>
        <div className={s.categoryContainer}>
          <HourCategory
            category="PV"
            hoursEarned={mpr.pvHours}
            totalHours={REQUIRED_HOURS.PVHours}
            showPercentage={false}
          />
          <HourCategory
            category="Other RE"
            hoursEarned={mpr.otherREHours}
            totalHours={REQUIRED_HOURS.OtherREHours}
            showPercentage={false}
          />
          <HourCategory
            category="BOS"
            hoursEarned={mpr.bosHours}
            totalHours={REQUIRED_HOURS.BOSHours}
            showPercentage={false}
          />

          <HourCategory
            category="Other"
            hoursEarned={mpr.otherHours}
            totalHours={REQUIRED_HOURS.otherHours}
            showPercentage={false}
          />
          <a
            className={s.photoLink}
            href={mpr.photoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Photo
          </a>
        </div>
        <div className={s.signatureContainer}>
          <Signature
            isApproved={mpr.supervisorSignature}
            openModal={openModal}
            apprenticeId={mpr.apprenticeId}
            supervisorId={mpr.supervisorId}
          />
          <Modal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            title="Edit Training"
          >
            {user && (
              <AddHours
                user={user}
                closeModal={() => setIsEditOpen(false)}
                mpr={mpr}
                supervisor={user?.role !== "apprentice"}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};
