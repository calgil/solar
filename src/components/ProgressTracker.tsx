/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/ProgressTracker.module.scss";

type ProgressTrackerProps = {
  percentage: number;
};

export const ProgressTracker = ({ percentage }: ProgressTrackerProps) => {
  return (
    <div className={s.progressBar}>
      <div className={s.percent}>{percentage}%</div>
      <div className={s.progress} style={{ width: `${percentage}%` }} />
    </div>
  );
};
