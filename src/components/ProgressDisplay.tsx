/* eslint-disable react/react-in-jsx-scope */
import { ProgressTracker } from "./ProgressTracker";
import s from "../styles/components/ProgressDisplay.module.scss";

type ProgressDisplayProps = {
  title: string;
  earned: number;
  required: number;
};

export const ProgressDisplay = ({
  title,
  earned,
  required,
}: ProgressDisplayProps) => {
  const percentage = Math.floor((earned / required) * 100);
  return (
    <div className={s.hourProgress}>
      <p className={s.title}>
        {title} <br />
        {earned}/{required}
      </p>
      <ProgressTracker percentage={percentage} />
    </div>
  );
};
