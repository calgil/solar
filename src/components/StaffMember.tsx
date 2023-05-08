/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/StaffMember.module.scss";
import { useEffect, useState } from "react";
import { capitalizeName } from "../utils/capitalizeName";
import { HoursDetails } from "./HoursDetails";
import { DownArrow } from "./DownArrow";
import { Link } from "react-router-dom";
import { ApprenticeData } from "../firebase/mpr/getApprenticeData";
import { User } from "../types/user.type";
import { fetchApprenticeData } from "../firebase/mpr/fetchMprs";

// lets consider passing in a user here. And this component can grab it's own data like in apprenticeDashboard

type StaffMemberProps = {
  user: User;
};

export const StaffMember = ({ user }: StaffMemberProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [apprenticeData, setApprenticeData] = useState<ApprenticeData | null>(
    null
  );

  const handleExpandClick = async () => {
    if (showDetails) {
      return setShowDetails(false);
    }
    setShowDetails(true);
  };

  useEffect(() => {
    if (user) {
      fetchApprenticeData(user.id, setApprenticeData);
    }
  }, []);

  return (
    <div className={s.staffMember} onClick={handleExpandClick}>
      <div className={s.staffContainer}>
        <div className={s.staffInfo}>
          <Link className={s.name} to={`staff/${user.id}`}>
            {capitalizeName(user.name)}
          </Link>
          <p className={s.role}>{capitalizeName(user.role)}</p>
        </div>
        <DownArrow expand={showDetails} />
      </div>
      {showDetails && user.role === "apprentice" && (
        <div className={s.detailsContainer}>
          {apprenticeData && (
            <HoursDetails apprenticeData={apprenticeData.data} />
          )}
        </div>
      )}
    </div>
  );
};
