/* eslint-disable react/react-in-jsx-scope */
import { ApprenticeMprData } from "../hooks/useStaffData";
import s from "../styles/components/MprTable.module.scss";

type MprTableProps = {
  data: ApprenticeMprData[];
  tableRef: React.RefObject<HTMLTableElement>;
};

export const MprTable = ({ data, tableRef }: MprTableProps) => {
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
          <tr className={s.row} key={apprentice.apprenticeId}>
            <td>{apprentice.name}</td>
            <td>{apprentice.data.totalHours}</td>
            <td>{apprentice.data.pvHours}</td>
            <td>{apprentice.data.oresHours}</td>
            <td>{apprentice.data.bosHours}</td>
            <td>{apprentice.data.otherHours}</td>
            <td>{apprentice.hasUnapprovedMpr ? "No" : "Yes"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
