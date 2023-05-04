/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/ArchivedUsers.module.scss";
import { useArchivedUsers } from "../hooks/useArchivedUsers";
import { StaffMember } from "./StaffMember";

export const ArchivedUsers = () => {
  const { apprenticeData, handleFilterChange } = useArchivedUsers();

  const [displayed, setDisplayed] = useState("archived");

  const filteredUsers = apprenticeData.filter(
    (user) => user.status === displayed
  );

  const handleDisplayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "graduated") {
      setDisplayed(value);
      handleFilterChange(value);
    }
    if (value === "archived") {
      setDisplayed(value);
      handleFilterChange(value);
    }
  };

  return (
    <div>
      <div className={s.actions}>
        <label className={s.label}>
          Select User Type:
          <select
            className={s.input}
            name="status"
            id="status"
            onChange={handleDisplayChange}
            value={displayed}
          >
            <option value="archived">Archived</option>
            <option value="graduated">Graduated</option>
          </select>
        </label>
      </div>
      {filteredUsers.map((app) => (
        <StaffMember key={app.apprenticeId} data={app} />
      ))}
    </div>
  );
};
