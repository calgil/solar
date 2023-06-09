/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/MprTableRow.module.scss";
import { useEffect, useState } from "react";
import { User } from "../types/user.type";
import { ApprenticeData } from "../firebase/mpr/getApprenticeData";
import { fetchApprenticeData } from "../firebase/mpr/fetchApprenticeData";
import { REQUIRED_HOURS } from "../data/hourRequirements";
import { capitalizeName } from "../utils/capitalizeName";

type MprTableRowProps = {
  user: User;
};
export const MprTableRow = ({ user }: MprTableRowProps) => {
  const [apprenticeData, setApprenticeData] = useState<ApprenticeData | null>(
    null
  );

  useEffect(() => {
    if (user) {
      const unsubscribe = fetchApprenticeData(user.id, setApprenticeData);
      return () => unsubscribe();
    }
  }, []);
  return (
    <>
      {user.role !== "apprentice" && (
        <tr className={s.row} key={user.id}>
          <td>{user.name}</td>
          <td>{capitalizeName(user.role)}</td>
          <td>{capitalizeName(user.status)}</td>
        </tr>
      )}
      {user.role === "apprentice" && apprenticeData && (
        <tr className={s.row} key={user.id}>
          <td>{user.name}</td>
          <td>
            {apprenticeData.data.totalHours}/{REQUIRED_HOURS.totalHours}
          </td>
          <td>
            {apprenticeData.data.pvHours}/{REQUIRED_HOURS.PVHours}
          </td>
          <td>
            {apprenticeData.data.otherREHours}/{REQUIRED_HOURS.OtherREHours}
          </td>
          <td>
            {apprenticeData.data.bosHours}/{REQUIRED_HOURS.BOSHours}
          </td>
          <td>
            {apprenticeData.data.otherHours}/{REQUIRED_HOURS.otherHours}
          </td>
          <td>{apprenticeData.data.hasUnapprovedMpr ? "No" : "Yes"}</td>
        </tr>
      )}
    </>
  );
};
