/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/ProgressTracker.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

type ProgressTrackerProps = {
  percentage: number;
};

export const ProgressTracker = ({ percentage }: ProgressTrackerProps) => {
  let progressClass;
  if (percentage === 0) {
    progressClass = "red";
  } else if (percentage > 0 && percentage <= 100) {
    progressClass = "yellow";
  } else if (percentage === 100) {
    progressClass = "green";
  } else {
    progressClass = "overage";
  }

  return (
    <div className={s.progressBar}>
      <div className={cx(s.percent, progressClass)}>{percentage}%</div>
      <div
        className={cx(s.progress, progressClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
