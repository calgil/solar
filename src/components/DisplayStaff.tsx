/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import s from "../styles/components/Staff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
import search from "../assets/search.png";
// import { Modal } from "./Modal";
// import { StaffFilter } from "./StaffFilter";
import { useStaffData } from "../hooks/useStaffData";

export const DisplayStaff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { apprenticeData, handleFilterChange } = useStaffData();
  console.log("display", { apprenticeData });

  // const filteredData = apprenticeData.filter((data) =>
  //   data.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  console.log({ apprenticeData });

  useEffect(() => {
    console.log("data change");
  }, [apprenticeData]);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const [dateRange, setDateRange] = useState(0);

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dateRange) {
      handleFilterChange(dateRange);
    }
  };

  return (
    <div className={s.staff}>
      <div className={s.adminActions}>
        <button
          // onClick={() => setIsFilterModalOpen(true)}
          className={s.filterBtn}
        >
          <div className={s.filterImg}>
            <img src={filter} alt="filter" />
          </div>
          Filters
        </button>
        <div className={s.searchContainer}>
          <input
            className={s.filterInput}
            type="text"
            placeholder="Filter Staff"
            onChange={handleSearchQueryChange}
          />
          <div className={s.searchImg}>
            <img src={search} alt="search" />
          </div>
        </div>
      </div>
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
      <div className={s.staffContainer}>
        {apprenticeData.map((data) => (
          <StaffMember key={data.apprenticeId} data={data} />
        ))}
      </div>
      {/* <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter"
        filter
      >
        <StaffFilter closeModal={() => setIsFilterModalOpen(false)} />
      </Modal> */}
    </div>
  );
};
