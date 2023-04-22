/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/HourCategory.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type HourCategoryProps = {
  hoursEarned: number;
  totalHours: number;
  category: string;
  showPercentage: boolean;
};

export const HourCategory = ({
  hoursEarned,
  totalHours,
  category,
  showPercentage,
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

  const categoryClass = cx({
    category: true,
    showPercentage,
  });
  return (
    <div className={cx(categoryClass, percentageClass)}>
      {showPercentage && (
        <div className={cx(s.percent, percentageClass)}>{percentage}%</div>
      )}
      {showPercentage && (
        <div className={s.showPercentage}>
          {category} <span className={s.line}>|</span> {hoursEarned} /
          {totalHours}
        </div>
      )}
      {!showPercentage && (
        <div className={s.noPercentage}>
          {category} <span className={s.line}>|</span> {hoursEarned}
        </div>
      )}
    </div>
  );
};
