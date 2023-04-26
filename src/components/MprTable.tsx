/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/MprTable.module.scss";
import { MprType } from "../types/mpr.type";
import { displayDate } from "../utils/displayDate";

type MprTableProps = {
  mprs: MprType[];
  tableRef: React.RefObject<HTMLTableElement>;
};

export const MprTable = ({ mprs, tableRef }: MprTableProps) => {
  return (
    <table className={s.table} ref={tableRef}>
      <thead className={s.headers}>
        <tr className={`${s.row} ${s.top}`}>
          <th>Name</th>
          <th>Date</th>
          <th>Total Time</th>
          <th>PS Hours</th>
          <th>ORES Hours</th>
          <th>BOS Hours</th>
          <th>Other Hours</th>
          <th>Supervisor Approved</th>
          <th>Approved</th>
        </tr>
      </thead>
      <tbody className={s.tableBody}>
        {mprs.map((mpr) => (
          <tr className={s.row} key={mpr.id}>
            <td>{mpr.apprenticeName}</td>
            <td>{displayDate(mpr.date)}</td>
            <td>{mpr.totalHours}</td>
            <td>{mpr.psHours}</td>
            <td>{mpr.oresHours}</td>
            <td>{mpr.bosHours}</td>
            <td>{mpr.otherHours}</td>
            <td>{mpr.supervisorSignature ? "Yes" : "No"}</td>
            <td>{mpr.adminApproval ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
