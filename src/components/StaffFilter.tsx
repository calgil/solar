/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useStaffData } from "../hooks/useStaffData";
import s from "../styles/components/StaffFilter.module.scss";

type StaffFilterProps = {
  closeModal: () => void;
  handleFilter: (newFilter: number) => void;
};

export const StaffFilter = ({ closeModal, handleFilter }: StaffFilterProps) => {
  const [dateRange, setDateRange] = useState(0);

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
        >
          <option value="">- Choose a Date Range</option>
          <option value={3}>Past Three Months</option>
          <option value={6}>Past Six Months</option>
          <option value={12}>Past Year</option>
          <option value={24}>Past 2 Years</option>
          <option value={60}>Past 5 Years</option>
        </select>
      </label>
      <input value="Apply Filters" type="submit" />
    </form>
  );
};
