/* eslint-disable react/react-in-jsx-scope */
import { Training } from "../firebase/training/addTrainingToDB";
import s from "../styles/components/TrainingDisplay.module.scss";
import { displayDate } from "../utils/displayDate";

type TrainingDisplayProps = {
  training: Training;
};

export const TrainingDisplay = ({ training }: TrainingDisplayProps) => {
  return (
    <div className={s.training}>
      <div className={s.left}>
        <p className={s.date}>{displayDate(training.dateCompleted)}</p>
        <p className={s.name}>{training.courseName}</p>
      </div>
      <div className={s.right}>
        <p className={s.hours}>{training.hours} Hours</p>
      </div>
    </div>
  );
};