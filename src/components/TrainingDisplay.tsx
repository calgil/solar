/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/TrainingDisplay.module.scss";
import { displayDate } from "../utils/displayDate";
import { Modal } from "./Modal";
import { AddTraining } from "./AddTraining";
import { useAuth } from "../providers/auth.provider";
import { Training } from "../types/training.type";
import { Signature } from "./Signature";

type TrainingDisplayProps = {
  training: Training;
};

export const TrainingDisplay = ({ training }: TrainingDisplayProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { user } = useAuth();

  const openModal = () => {
    setIsEditOpen(true);
  };
  return (
    <div className={s.training}>
      <div className={s.left}>
        <p className={s.date}>{displayDate(training.dateCompleted)}</p>
        <p className={s.name}>{training.courseCompleted.name}</p>
      </div>
      <div className={s.right}>
        <Signature
          isApproved={training.supervisorSignature}
          openModal={openModal}
          apprenticeId={training.apprenticeId}
          supervisorId={training.supervisorId}
        />
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Training"
      >
        <AddTraining
          closeModal={() => setIsEditOpen(false)}
          supervisor={user?.role !== "apprentice"}
          training={training}
        />
      </Modal>
    </div>
  );
};
