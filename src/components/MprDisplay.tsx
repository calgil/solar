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
    <div
      className={s.mprDetails}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation()
      }
    >
      <div className={s.hoursContainer}>
        <p className={s.date}>{displayDate(mpr.date)}</p>
        <p className={s.totalHours}>{mpr.totalHours} Hours</p>
        <div className={s.categoryContainer}>
          <HourCategory
            category="PS"
            hoursEarned={mpr.psHours}
            totalHours={1000}
            showPercentage={false}
          />
          <HourCategory
            category="BOS"
            hoursEarned={mpr.bosHours}
            totalHours={1500}
            showPercentage={false}
          />
          <HourCategory
            category="ORES"
            hoursEarned={mpr.oresHours}
            totalHours={500}
            showPercentage={false}
          />
          <HourCategory
            category="Other"
            hoursEarned={mpr.otherHours}
            totalHours={1000}
            showPercentage={false}
          />
        </div>
        <div className={s.signatureContainer}>
          <Signature
            text="Supervisor Signature"
            isSigned={mpr.supervisorSignature}
            mpr={mpr}
          />
        </div>
      </div>
    </div>
  );
};
