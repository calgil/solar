/* eslint-disable react/react-in-jsx-scope */
import { REQUIRED_HOURS } from "../data/hourRequirements";
import { ApprenticeData } from "../firebase/mpr/getApprenticeData";
import s from "../styles/components/MprTable.module.scss";

type MprTableProps = {
  apprenticeData: ApprenticeData[];
  tableRef: React.RefObject<HTMLTableElement>;
};

export const MprTable = ({ apprenticeData: data, tableRef }: MprTableProps) => {
  return (
    <table className={s.table} ref={tableRef}>
      <thead className={s.headers}>
        <tr className={`${s.row} ${s.top}`}>
          <th>Name</th>
          <th>Total Time</th>
          <th>PV Hours</th>
          <th>Other RE Hours</th>
          <th>BOS Hours</th>
          <th>Other Hours</th>
          <th>Supervisor Approved</th>
        </tr>
      </thead>
      <tbody className={s.tableBody}>
        {data.map((apprentice) => (
          <tr className={s.row} key={apprentice.id}>
            <td>{apprentice.name}</td>
            <td>
              {apprentice.data.totalHours}/{REQUIRED_HOURS.totalHours}
            </td>
            <td>
              {apprentice.data.pvHours}/{REQUIRED_HOURS.PVHours}
            </td>
            <td>
              {apprentice.data.otherREHours}/{REQUIRED_HOURS.OtherREHours}
            </td>
            <td>
              {apprentice.data.bosHours}/{REQUIRED_HOURS.BOSHours}
            </td>
            <td>
              {apprentice.data.otherHours}/{REQUIRED_HOURS.otherHours}
            </td>
            <td>{apprentice.data.hasUnapprovedMpr ? "No" : "Yes"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
