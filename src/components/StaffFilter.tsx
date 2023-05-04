/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/StaffFilter.module.scss";

// type Role = "apprentices" | "supervisors";

type StaffFilterProps = {
  closeModal: () => void;
  handleFilter: (dateRange: number, approval?: boolean) => void;
  date: number;
  approval: boolean;
  clear: () => void;
};

export const StaffFilter = ({
  closeModal,
  handleFilter,
  date,
  approval,
  clear,
}: StaffFilterProps) => {
  const [dateRange, setDateRange] = useState(date);
  const [showApproved, setShowApproved] = useState(approval);
  // const [role, setRole] = useState<Role>("apprentices");

  const handleApprovalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (+e.target.value < 0) {
      return setShowApproved(false);
    }
    return setShowApproved(true);
  };

  // const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log("role change");
  //   const newRole = e.target.value as Role;
  //   if (newRole) {
  //     setRole(newRole);
  //   }
  // };

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilter(dateRange, showApproved);
    closeModal();
  };
  return (
    <form className={s.staffFilter} onSubmit={applyFilters}>
      <label className={s.label}>
        Date Range
        <select
          name="dateRange"
          id="dateRange"
          onChange={(e) => setDateRange(+e.target.value)}
          className={s.input}
          value={dateRange}
        >
          <option value="">- Choose a Date Range</option>
          <option value={1}>Last Month</option>
          <option value={6}>Past Six Months</option>
          <option value={12}>Past Year</option>
          <option value={24}>Past 2 Years</option>
          <option value={60}>Past 5 Years</option>
          <option value={-1}>All</option>
        </select>
      </label>
      <label className={s.label}>
        Approval Status
        <select
          className={s.input}
          name="approval"
          id="approval"
          onChange={handleApprovalChange}
          value={showApproved ? 1 : -1}
        >
          <option value="">- Select Approval Status</option>
          <option value={1}>All Approved</option>
          <option value={-1}>Unapproved</option>
        </select>
      </label>
      {/* <label className={s.label}>
        Staff Role
        <select
          className={s.input}
          name="role"
          id="role"
          onChange={handleRoleChange}
          value={role}
        >
          <option value="">- Select Role</option>
          <option value="apprentices">Apprentices</option>
          <option value="supervisors">Supervisors</option>
        </select>
      </label> */}
      <div className={s.submitContainer}>
        <input className={s.submitBtn} value="Apply Filters" type="submit" />
      </div>
      <p className={s.reset} onClick={() => clear()}>
        Reset Filters
      </p>
    </form>
  );
};
