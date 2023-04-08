/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/MprDisplay.module.scss";
import { MprType } from "../types/mpr.type";
import { displayDate } from "../utils/displayDate";
import { HourCategory } from "./HourCategory";
import { Signature } from "./Signature";

type MprDetailsProps = {
  mpr: MprType;
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
        hoursEarned={mpr.oresHours}
        totalHours={500}
      />
      <HourCategory
        category="Other"
        hoursEarned={mpr.otherHours}
        totalHours={1000}
      />
      {/* <Signature
        text="Apprentice Signature"
        isSigned={mpr.apprenticeSignature}
      />
      <Signature
        text="Supervisor Signature"
        isSigned={mpr.supervisorSignature}
      /> */}
    </div>
  );
};
