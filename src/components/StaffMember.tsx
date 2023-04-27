/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/StaffMember.module.scss";
import { useState } from "react";
import { capitalizeName } from "../utils/capitalizeName";
import { HoursDetails } from "./HoursDetails";
import { DownArrow } from "./DownArrow";
import { Link } from "react-router-dom";
import { ApprenticeMprData } from "../hooks/useStaffData";

type StaffMemberProps = {
  data: ApprenticeMprData;
};

export const StaffMember = ({ data }: StaffMemberProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleExpandClick = async () => {
    if (showDetails) {
      return setShowDetails(false);
    }
    setShowDetails(true);
  };

  return (
    <div className={s.staffMember} onClick={handleExpandClick}>
      <div className={s.staffContainer}>
        <div className={s.staffInfo}>
          <Link className={s.name} to={`staff/${data.apprenticeId}`}>
            {capitalizeName(data.name)}
          </Link>
          {/* <p className={s.role}>{capitalizeName(user.role)}</p> */}
        </div>
        <DownArrow expand={showDetails} />
      </div>
      {showDetails && (
        <div className={s.detailsContainer}>
          {data && <HoursDetails apprenticeData={data.data} />}
        </div>
      )}
    </div>
  );
};
