/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/Staff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
import { Modal } from "./Modal";
import { StaffFilter } from "./StaffFilter";
import { useStaffData } from "../hooks/useStaffData";
import { ApprenticeSearch } from "./ApprenticeSearch";

export const DisplayStaff = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { apprenticeData, handleFilterChange } = useStaffData();

  const handleSearch = (name: string) => {
    setSearchQuery(name);
    console.log("Find name", name);
  };

  const handleNameChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className={s.staff}>
      <div className={s.adminActions}>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={s.filterBtn}
        >
          <div className={s.filterImg}>
            <img src={filter} alt="filter" />
          </div>
          Filters
        </button>
        <ApprenticeSearch
          onSelect={handleSearch}
          onInputChange={handleNameChange}
          inputValue={searchQuery}
        />
      </div>
      <div className={s.staffContainer}>
        {apprenticeData.map((data) => (
          <StaffMember key={data.apprenticeId} data={data} />
        ))}
      </div>
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter"
        filter
      >
        <StaffFilter
          closeModal={() => setIsFilterModalOpen(false)}
          handleFilter={handleFilterChange}
        />
      </Modal>
    </div>
  );
};
