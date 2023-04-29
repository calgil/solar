/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/Staff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
// import search from "../assets/search.png";
import { Modal } from "./Modal";
import { StaffFilter } from "./StaffFilter";
import { useStaffData } from "../hooks/useStaffData";

export const DisplayStaff = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { apprenticeData, handleFilterChange } = useStaffData();
  console.log("display", { apprenticeData });

  console.log({ apprenticeData });

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
