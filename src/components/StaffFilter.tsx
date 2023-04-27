/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useStaffData } from "../hooks/useStaffData";
import s from "../styles/components/StaffFilter.module.scss";

export const StaffFilter = () => {
  const { pastSixMonths, pastThreeMonths } = useStaffData();

  const [dateRange, setDateRange] = useState("");

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dateRange === "3") {
      return await pastThreeMonths();
    }
    if (dateRange === "6") {
      return pastSixMonths();
    }
    console.log("apply filters");
  };
  return (
    <form className={s.staffFilter} onSubmit={applyFilters}>
      <label>
        Date Range
        <select
          name="dateRange"
          id="dateRange"
          onChange={(e) => setDateRange(e.target.value)}
          className={s.input}
        >
          <option value="">- Choose a Date Range</option>
          <option value="3">Past Three Months</option>
          <option value="6">Past Six Months</option>
          <option value="12">Past Year</option>
        </select>
      </label>
      <input value="Apply Filters" type="submit" />
    </form>
  );
};
