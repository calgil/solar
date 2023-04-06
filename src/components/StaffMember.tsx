/* eslint-disable react/react-in-jsx-scope */
import { User } from "../types/user.type";
import s from "../styles/components/StaffMember.module.scss";
import { useState } from "react";
import { capitalizeName } from "../utils/capitalizeName";
import {
  ApprenticeData,
  getApprenticeData,
} from "../firebase/mpr/getApprenticeData";
import { HoursDetails } from "./HoursDetails";
import { DownArrow } from "./DownArrow";

type StaffMemberProps = {
  user: User;
};

export const StaffMember = ({ user }: StaffMemberProps) => {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [apprenticeData, setApprenticeData] = useState<ApprenticeData | null>(
    null
  );

  const handleExpandClick = async () => {
    if (showDetails) {
      return setShowDetails(false);
    }
    setLoading(true);
    setShowDetails(true);

    const apprenticeHours = await getApprenticeData(user.id);

    if (!apprenticeHours) {
      setLoading(false);
      return console.log("could not fetch apprentice data");
    }

    setApprenticeData(apprenticeHours);
    setLoading(false);
    console.log({ apprenticeHours });
  };

  return (
    <div className={s.staffMember} onClick={handleExpandClick}>
      <div className={s.staffContainer}>
        <div className={s.staffInfo}>
          <p className={s.name}>{capitalizeName(user.name)}</p>
          <p className={s.role}>{capitalizeName(user.role)}</p>
        </div>
        <DownArrow expand={showDetails} />
      </div>
      {loading && "loading"}
      {showDetails && !loading && (
        <div className={s.detailsContainer}>
          {apprenticeData && !loading && (
            <HoursDetails apprenticeData={apprenticeData} />
          )}
        </div>
      )}
    </div>
  );
};
