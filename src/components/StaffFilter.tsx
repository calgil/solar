/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/StaffFilter.module.scss";

type StaffFilterProps = {
  closeModal: () => void;
  handleFilter: (newFilter: number) => void;
};

export const StaffFilter = ({ closeModal, handleFilter }: StaffFilterProps) => {
  const [dateRange, setDateRange] = useState(6);

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dateRange) {
      handleFilter(dateRange);
    }

    closeModal();
  };
  return (
    <form className={s.staffFilter} onSubmit={applyFilters}>
      <label>
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
          {/* TODO: All All filter */}
        </select>
      </label>
      <div className={s.submitContainer}>
        <input className={s.submitBtn} value="Apply Filters" type="submit" />
      </div>
    </form>
  );
};
