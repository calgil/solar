/* eslint-disable react/react-in-jsx-scope */
import { ProgressTracker } from "./ProgressTracker";
import s from "../styles/components/ProgressDisplay.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

type ProgressDisplayProps = {
  title: string;
  earned: number;
  required: number;
  main: boolean;
};

export const ProgressDisplay = ({
  title,
  earned,
  required,
  main,
}: ProgressDisplayProps) => {
  const percentage = Math.floor((earned / required) * 100);

  const progressClass = cx({
    hourProgress: true,
    main,
  });

  return (
    <div className={progressClass}>
      <div className={s.text}>
        <p className={s.title}>{title}</p>
        <p className={s.hours}>
          {earned}/{required}
        </p>
      </div>
      <ProgressTracker percentage={percentage} />
    </div>
  );
};
