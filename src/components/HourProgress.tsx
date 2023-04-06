/* eslint-disable react/react-in-jsx-scope */
import { ProgressTracker } from "./ProgressTracker";
import s from "../styles/components/HourProgress.module.scss";

type HourProgressProps = {
  title: string;
  hoursEarned: number;
  requiredHours: number;
};

export const HourProgress = ({
  title,
  hoursEarned,
  requiredHours,
}: HourProgressProps) => {
  const percentage = Math.floor((hoursEarned / requiredHours) * 100);
  return (
    <div className={s.hourProgress}>
      <p className={s.title}>
        {title} <br />
        {hoursEarned}/{requiredHours}
      </p>
      <ProgressTracker percentage={percentage} />
    </div>
  );
};
