/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Training } from "../firebase/training/addTrainingToDB";
import s from "../styles/components/TrainingDisplay.module.scss";
import { displayDate } from "../utils/displayDate";
import { Modal } from "./Modal";
import { AddTraining } from "./AddTraining";

type TrainingDisplayProps = {
  training: Training;
};

export const TrainingDisplay = ({ training }: TrainingDisplayProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const editTraining = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEditOpen(true);
  };
  return (
    <div className={s.training}>
      <div className={s.left}>
        <p className={s.date}>{displayDate(training.dateCompleted)}</p>
        <p className={s.name}>{training.courseName}</p>
      </div>
      <div className={s.right}>
        <button className={s.action} onClick={editTraining}>
          Edit Training
        </button>
        <p className={s.hours}>{training.hours} Hours</p>
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Training"
      >
        <AddTraining closeModal={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};
