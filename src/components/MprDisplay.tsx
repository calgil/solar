/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/MprDisplay.module.scss";
import { mprType } from "../types/mpr.type";
import { displayDate } from "../utils/displayDate";
import { HourCategory } from "./HourCategory";

type MprDetailsProps = {
  mpr: mprType;
};

export const MprDisplay = ({ mpr }: MprDetailsProps) => {
  return (
    <div className={s.mprDetails}>
      <p className={s.date}>{displayDate(mpr.date)}</p>
      <p className={s.totalHours}>{mpr.totalHours} Hours</p>
      <HourCategory category="PS" hoursEarned={mpr.psHours} totalHours={1000} />
      <HourCategory
        category="BOS"
        hoursEarned={mpr.bosHours}
        totalHours={1500}
      />
      <HourCategory
        category="ORES"
        hoursEarned={mpr.resHours}
        totalHours={500}
      />
      <HourCategory
        category="Other"
        hoursEarned={mpr.otherHours}
        totalHours={1000}
      />
    </div>
  );
};
