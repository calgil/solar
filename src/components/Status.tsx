/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/Status.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(s);

type StatusProps = {
  status: "active" | "graduated" | "archived";
};

export const Status = ({ status }: StatusProps) => {
  const statusClass = cx({
    userStatus: true,
    [`${status}`]: true,
  });

  return (
    <div className={s.statusContainer}>
      <span className={statusClass}></span>
    </div>
  );
};
