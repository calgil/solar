/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { ApprenticeData } from "../firebase/mpr/getApprenticeData";
import s from "../styles/components/HoursDetails.module.scss";
import { DownArrow } from "./DownArrow";
import { HourCategory } from "./HourCategory";
import { MprDetails } from "./MprDisplay";

type HoursDetailsProps = {
  apprenticeData: ApprenticeData;
};

export const HoursDetails = ({ apprenticeData }: HoursDetailsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleExpandClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };
  return (
    <div className={s.detailsContainer}>
      <div className={s.collapsedView} onClick={handleExpandClick}>
        <div className={s.hours}>
          <h3 className={s.title}>Hours</h3>
          <p>{apprenticeData.totalHours}/4000</p>
          <HourCategory
            category="PS"
            hoursEarned={apprenticeData.psHours}
            totalHours={1000}
          />
          <HourCategory
            category="BOS"
            hoursEarned={apprenticeData.bosHours}
            totalHours={1500}
          />
          <HourCategory
            category="ORES"
            hoursEarned={apprenticeData.resHours}
            totalHours={500}
          />
          <HourCategory
            category="Other"
            hoursEarned={apprenticeData.otherHours}
            totalHours={1000}
          />
        </div>
        <DownArrow expand={showDetails} />
      </div>
      {showDetails &&
        apprenticeData.recentMprs.map((mpr) => (
          <MprDetails key={mpr.id} mpr={mpr} />
        ))}
    </div>
  );
};
