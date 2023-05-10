/* eslint-disable react/react-in-jsx-scope */
import { User } from "../types/user.type";
import s from "../styles/components/MprTable.module.scss";
import { MprTableRow } from "./MprTableRow";

type MprTableProps = {
  users: User[];
  tableRef: React.RefObject<HTMLTableElement>;
};

export const MprTable = ({ users, tableRef }: MprTableProps) => {
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
        {users.map((user) => (
          <MprTableRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};
