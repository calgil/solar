/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { REQUIRED_HOURS } from "../data/hourRequirements";
import s from "../styles/components/HoursOverview.module.scss";
import { DownArrow } from "./DownArrow";
import { HourProgress } from "./HourProgress";

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
export const HoursOverview = ({
  hours: { totalHours, psHours, oresHours, bosHours, otherHours },
}: HoursOverviewProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleExpandClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className={s.hoursOverview}>
      <div className={s.totalHours} onClick={handleExpandClick}>
        <HourProgress
          title="Total Hours"
          hoursEarned={totalHours}
          requiredHours={REQUIRED_HOURS.totalHours}
        />
        <DownArrow expand={showDetails} />
      </div>
      {showDetails && (
        <div className={s.hoursDetails}>
          <HourProgress
            title="PS"
            hoursEarned={psHours}
            requiredHours={REQUIRED_HOURS.PSHours}
          />
          <HourProgress
            title="BOS"
            hoursEarned={bosHours}
            requiredHours={REQUIRED_HOURS.BOSHours}
          />
          <HourProgress
            title="ORES"
            hoursEarned={oresHours}
            requiredHours={REQUIRED_HOURS.ORESHours}
          />
          <HourProgress
            title="Other"
            hoursEarned={otherHours}
            requiredHours={REQUIRED_HOURS.otherHours}
          />
        </div>
      )}
    </div>
  );
};
