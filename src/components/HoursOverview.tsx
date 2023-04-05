/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/HoursOverview.module.scss";
import { DownArrow } from "./DownArrow";

type Hours = {
  totalHours: number;
  psHours: number;
  bosHours: number;
  oresHours: number;
  otherHours: number;
};

type HoursOverviewProps = {
  hours: Hours;
};
export const HoursOverview = ({ hours }: HoursOverviewProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleExpandClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className={s.hoursOverview}>
      <div className={s.totalHours} onClick={handleExpandClick}>
        <div className={s.percentageBar}>Total Hours</div>
        <DownArrow expand={showDetails} />
      </div>
      {showDetails && <div className={s.hoursDetails}>Category Totals</div>}
    </div>
  );
};
