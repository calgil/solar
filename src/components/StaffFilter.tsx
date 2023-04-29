/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/StaffFilter.module.scss";

type StaffFilterProps = {
  closeModal: () => void;
  handleFilter: (dateRange: number, approval?: boolean) => void;
};

export const StaffFilter = ({ closeModal, handleFilter }: StaffFilterProps) => {
  const [dateRange, setDateRange] = useState(6);
  const [approval, setApproval] = useState(false);

  const handleApprovalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (+e.target.value < 0) {
      return setApproval(false);
    }
    return setApproval(true);
  };

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilter(dateRange, approval);
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
        >
          <option value="">- Select Approval Status</option>
          <option value={1}>Yes</option>
          <option value={-1}>No</option>
        </select>
      </label>
      <div className={s.submitContainer}>
        <input className={s.submitBtn} value="Apply Filters" type="submit" />
      </div>
      <p className={s.reset}>Reset Filters</p>
    </form>
  );
};
