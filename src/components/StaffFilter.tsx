/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/StaffFilter.module.scss";
import { UserRole, UserStatus } from "../types/user.type";

type StaffFilterProps = {
  closeModal: () => void;
  applyFilters: (
    dateRange: number,
    approval: boolean,
    status: UserStatus,
    role: UserRole
  ) => void;
  date: number;
  status: UserStatus;
  approval: boolean;
  role: UserRole;
  clear: () => void;
};

export const StaffFilter = ({
  closeModal,
  applyFilters,
  date,
  approval,
  status,
  role,
  clear,
}: StaffFilterProps) => {
  const [dateRange, setDateRange] = useState(date);
  const [approved, setApproved] = useState(approval);
  const [selectedRole, setSelectedRole] = useState<UserRole>(role);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(status);

  const handleApprovalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (+e.target.value < 0) {
      return setApproved(false);
    }
    return setApproved(true);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    if (newRole) {
      setSelectedRole(newRole);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as UserStatus;
    if (newStatus) {
      setSelectedStatus(newStatus);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      return;
    }
    setDateRange(+e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submint", dateRange, approved, selectedStatus, selectedRole);

    applyFilters(dateRange, approved, selectedStatus, selectedRole);
    closeModal();
  };
  // TODO: fix styles on labels when input is disabled
  return (
    <form className={s.staffFilter} onSubmit={handleSubmit}>
      <label className={s.label}>
        Staff Role
        <select
          className={s.input}
          name="role"
          id="role"
          onChange={handleRoleChange}
          value={selectedRole}
        >
          <option value="">- Select a Role</option>
          <option value="apprentice">Apprentices</option>
          <option value="supervisor">Supervisors</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <label className={s.label}>
        Status
        <select
          className={s.input}
          name="status"
          id="status"
          onChange={handleStatusChange}
          value={selectedStatus}
        >
          <option value="">- Select a Status</option>
          <option value="active">Active</option>
          <option value="graduated">Graduated</option>
          <option value="archived">Archived</option>
        </select>
      </label>
      <label className={s.label}>
        Date Range
        <select
          name="dateRange"
          id="dateRange"
          onChange={handleDateChange}
          className={s.input}
          value={dateRange}
          disabled={selectedRole !== "apprentice"}
        >
          <option value="">- Choose a Date Range</option>
          <option value={1}>Last Month</option>
          <option value={6}>Past 6 Months</option>
          <option value={12}>Past Year</option>
          <option value={24}>Past 2 Years</option>
          <option value={60}>Past 5 Years</option>
          <option value={-1}>All</option>
        </select>
      </label>
      <label className={s.label}>
        Approval
        <select
          className={s.input}
          name="approval"
          id="approval"
          onChange={handleApprovalChange}
          value={approved ? 1 : -1}
          disabled={selectedRole !== "apprentice"}
        >
          <option value="">- Select Approval Status</option>
          <option value={1}>All Approved</option>
          <option value={-1}>Unapproved</option>
        </select>
      </label>

      <div className={s.submitContainer}>
        <input className={s.submitBtn} value="Apply Filters" type="submit" />
      </div>
      <p className={s.reset} onClick={() => clear()}>
        Reset Filters
      </p>
    </form>
  );
};
