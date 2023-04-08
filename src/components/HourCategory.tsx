/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/HourCategory.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type HourCategoryProps = {
  hoursEarned: number;
  totalHours: number;
  category: string;
};

export const HourCategory = ({
  hoursEarned,
  totalHours,
  category,
}: HourCategoryProps) => {
  const percentage = Math.round((hoursEarned / totalHours) * 100);

  let percentageClass;
  if (percentage === 0) {
    percentageClass = "red";
  } else if (percentage > 0 && percentage <= 100) {
    percentageClass = "yellow";
  } else if (percentage === 100) {
    percentageClass = "green";
  } else {
    percentageClass = "overage";
  }
  return (
    <div className={cx(s.category, percentageClass)}>
      <div className={cx(s.percent, percentageClass)}>{percentage}%</div>
      {category} <span className={s.line}>|</span> {hoursEarned} / {totalHours}
    </div>
  );
};
