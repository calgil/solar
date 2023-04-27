/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/Staff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
import search from "../assets/search.png";
import { Modal } from "./Modal";
import { StaffFilter } from "./StaffFilter";
import { useStaffData } from "../hooks/useStaffData";

export const DisplayStaff = () => {
  const { apprenticeData } = useStaffData();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const filteredData = apprenticeData.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log({ apprenticeData });

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
        <StaffFilter closeModal={() => setIsFilterModalOpen(false)} />
      </Modal>
    </div>
  );
};
