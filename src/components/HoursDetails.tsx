/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { ApprenticeData } from "../firebase/mpr/getApprenticeData";
import s from "../styles/components/HoursDetails.module.scss";
import { DownArrow } from "./DownArrow";
import { HourCategory } from "./HourCategory";
import { MprDisplay } from "./MprDisplay";
import { REQUIRED_HOURS } from "../data/hourRequirements";

type HoursDetailsProps = {
  apprenticeData: ApprenticeData;
};

export const HoursDetails = ({ apprenticeData }: HoursDetailsProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [numMprsToShow, setNumMprsToShow] = useState(3);

  const handleExpandClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  const handleSeeMoreClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNumMprsToShow(apprenticeData.mprs.length);
  };

  const handleShowLessClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setNumMprsToShow(3);
  };

  return (
    <div className={s.detailsContainer}>
      <div className={s.collapsedView} onClick={handleExpandClick}>
        <div className={s.hours}>
          <h3 className={s.title}>Hours</h3>
          <p className={s.totalHours}>{apprenticeData.totalHours}/4000</p>
          <div className={s.categoryContainer}>
            <HourCategory
              category="PV"
              hoursEarned={apprenticeData.pvHours}
              totalHours={REQUIRED_HOURS.PVHours}
              showPercentage
            />
            <HourCategory
              category="Other RE"
              hoursEarned={apprenticeData.oresHours}
              totalHours={REQUIRED_HOURS.OtherREHours}
              showPercentage
            />
            <HourCategory
              category="BOS"
              hoursEarned={apprenticeData.bosHours}
              totalHours={REQUIRED_HOURS.BOSHours}
              showPercentage
            />

            <HourCategory
              category="Other"
              hoursEarned={apprenticeData.otherHours}
              totalHours={REQUIRED_HOURS.otherHours}
              showPercentage
            />
          </div>
        </div>
        <div className={s.actions}>
          <DownArrow expand={showDetails} />
        </div>
      </div>
      {showDetails && (
        <div className={s.mprsContainer}>
          {apprenticeData.mprs.slice(0, numMprsToShow).map((mpr) => (
            <MprDisplay key={mpr.id} mpr={mpr} />
          ))}
          {apprenticeData.mprs.length > numMprsToShow && (
            <div className={s.mprQuantity} onClick={handleSeeMoreClick}>
              See more...
            </div>
          )}
          {apprenticeData.mprs.length === numMprsToShow && (
            <div className={s.mprQuantity} onClick={handleShowLessClick}>
              Show Less
            </div>
          )}
        </div>
      )}
    </div>
  );
};
