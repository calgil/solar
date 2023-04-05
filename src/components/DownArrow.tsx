/* eslint-disable react/react-in-jsx-scope */
import downArrow from "../assets/downArrow.png";
import s from "../styles/components/DownArrow.module.scss";
import classNames from "classnames/bind";

type DownArrowProps = {
  expand: boolean;
};

const cx = classNames.bind(s);

export const DownArrow = ({ expand }: DownArrowProps) => {
  const btnClass = cx({
    expandBtn: true,
    expand,
  });
  return (
    <button className={btnClass}>
      <img src={downArrow} alt="down" />
    </button>
  );
};
