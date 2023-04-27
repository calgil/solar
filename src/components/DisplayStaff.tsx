/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import s from "../styles/components/Staff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
import search from "../assets/search.png";
import { Modal } from "./Modal";
import { StaffFilter } from "./StaffFilter";
import { useStaffData } from "../hooks/useStaffData";

export const DisplayStaff = () => {
  const { apprenticeData } = useStaffData();

  // const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  //   TODO: Error/loading
  // const { users } = useUsers();

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.role.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  // step 1 find the user id of any apprentice that has posted an mpr within the last 90 days(default)
  // step 2 get those users by id
  // step 3 get their data

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
            // onChange={handleSearchQueryChange}
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
        <StaffFilter />
      </Modal>
    </div>
  );
};
