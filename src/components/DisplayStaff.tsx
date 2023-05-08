/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/DisplayStaff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
import { Modal } from "./Modal";
import { ApprenticeSearch } from "./ApprenticeSearch";
import { AddHours } from "./AddHours";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../providers/auth.provider";
import { useStaffData } from "../hooks/useStaffData";
import { StaffFilter } from "./StaffFilter";
import { useUserData } from "../hooks/useUserData";

export const DisplayStaff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState(6);
  const [approval, setApproval] = useState(false);

  const { user } = useAuth();
  const { apprentices } = useUsers();
  const { handleFilterChange, fetchApprenticeByName, clear } = useStaffData();

  const { staffData } = useUserData();

  const handleSearch = (name: string) => {
    setSearchQuery(name);
    fetchApprenticeByName(name);
  };

  const handleNameChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleDateChange = (month: number, approval?: boolean) => {
    setDateRange(month);
    if (approval) {
      setApproval(approval);
    } else {
      setApproval(false);
    }
    handleFilterChange(month, approval);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clear();
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
          clearSearch={handleClearSearch}
        />
        <button className={s.addHours} onClick={() => setIsModalOpen(true)}>
          Add Hours
        </button>
      </div>
      <div className={s.staffContainer}>
        {staffData.map((data) => (
          <StaffMember key={data.id} data={data} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Hours"
      >
        {user && (
          <AddHours
            user={user}
            closeModal={() => setIsModalOpen(false)}
            supervisor="admin"
            apprentices={apprentices}
          />
        )}
      </Modal>
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter"
        filter
      >
        <StaffFilter
          closeModal={() => setIsFilterModalOpen(false)}
          handleFilter={handleDateChange}
          date={dateRange}
          approval={approval}
          clear={clear}
        />
      </Modal>
    </div>
  );
};
