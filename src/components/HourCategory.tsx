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

  const red = cx(s.category, s.red);
  const green = cx(s.category, s.green);
  const yellow = cx(s.category, s.yellow);
  const black = cx(s.category, s.black);

  let categoryClass;
  if (percentage === 0) {
    categoryClass = red;
  } else if (percentage > 0 && percentage <= 100) {
    categoryClass = yellow;
  } else if (percentage === 100) {
    categoryClass = green;
  } else {
    categoryClass = black;
  }
  return (
    <p className={cx(category, categoryClass)}>
      {category} <span className={s.line}>|</span> {hoursEarned} / {totalHours}
    </p>
  );
};