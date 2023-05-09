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
import { StaffFilter } from "./StaffFilter";
import { useUserData } from "../hooks/useUserData";
import { UserRole, UserStatus } from "../types/user.type";

export const DisplayStaff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState(6);
  const [status, setStatus] = useState<UserStatus>("active");
  const [role, setRole] = useState<UserRole>("apprentice");
  const [approval, setApproval] = useState(false);

  const { user } = useAuth();
  const { apprentices } = useUsers();

  const { staffData, handleFilterChange, fetchStaffByName, clear } =
    useUserData();
  console.log({ staffData });

  const handleSearch = (name: string) => {
    setSearchQuery(name);
    fetchStaffByName(name);
  };

  const handleNameChange = (value: string) => {
    setSearchQuery(value);
  };

  const applyFilters = (
    month: number,
    approval: boolean,
    status: UserStatus,
    role: UserRole
  ) => {
    if (month) {
      setDateRange(month);
    }

    if (approval) {
      setApproval(approval);
    } else {
      setApproval(false);
    }
    setStatus(status);
    setRole(role);
    handleFilterChange(month, approval, status, role);
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
        {staffData.map((staff) => (
          <StaffMember key={staff.id} user={staff} />
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
          applyFilters={applyFilters}
          date={dateRange}
          status={status}
          role={role}
          approval={approval}
          clear={clear}
        />
      </Modal>
    </div>
  );
};
