/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { REQUIRED_HOURS } from "../data/hourRequirements";
import s from "../styles/components/HoursOverview.module.scss";
import { DownArrow } from "./DownArrow";
import { ProgressDisplay } from "./ProgressDisplay";

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
        <ProgressDisplay
          title="Total Hours"
          earned={totalHours}
          required={REQUIRED_HOURS.totalHours}
          main
        />
        <DownArrow expand={showDetails} />
      </div>
      {showDetails && (
        <div className={s.hoursDetails}>
          <ProgressDisplay
            title="PS"
            earned={psHours}
            required={REQUIRED_HOURS.PVHours}
            main={false}
          />
          <ProgressDisplay
            title="BOS"
            earned={bosHours}
            required={REQUIRED_HOURS.BOSHours}
            main={false}
          />
          <ProgressDisplay
            title="ORES"
            earned={oresHours}
            required={REQUIRED_HOURS.OtherREHours}
            main={false}
          />
          <ProgressDisplay
            title="Other"
            earned={otherHours}
            required={REQUIRED_HOURS.otherHours}
            main={false}
          />
        </div>
      )}
    </div>
  );
};
