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
import { AddBtn } from "./AddBtn";
import { AddUser } from "./AddUser";
import { AddTraining } from "./AddTraining";

export const DisplayStaff = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isHoursOpen, setIsHoursOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<UserRole>("apprentice");
  const [status, setStatus] = useState<UserStatus>("active");
  const [missingMPR, setMissingMPR] = useState(0);
  const [dateRange, setDateRange] = useState(6);
  const [approval, setApproval] = useState(false);

  const { user } = useAuth();
  const { apprentices } = useUsers();

  const { staffData, handleFilterChange, fetchStaffByName, clear } =
    useUserData();

  const handleSearch = (name: string) => {
    setSearchQuery(name);
    fetchStaffByName(name);
  };

  const handleNameChange = (value: string) => {
    setSearchQuery(value);
  };

  const applyFilters = (
    role: UserRole,
    status: UserStatus,
    missingMPR: number,
    month: number,
    approval: boolean
  ) => {
    if (month) {
      setDateRange(month);
    }

    if (approval) {
      setApproval(approval);
    } else {
      setApproval(false);
    }
    setMissingMPR(missingMPR);
    setStatus(status);
    setRole(role);
    handleFilterChange(role, status, missingMPR, month, approval);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clear();
  };

  return (
    <div className={s.staff}>
      <div>
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
          <button className={s.addHours} onClick={() => setIsHoursOpen(true)}>
            Add Hours
          </button>
        </div>
        <div className={s.staffActions}>
          <AddBtn text="Add User" onClick={() => setIsUserOpen(true)} />
          <Modal
            isOpen={isUserOpen}
            onClose={() => setIsUserOpen(false)}
            title="Add User"
          >
            <AddUser closeModal={() => setIsUserOpen(false)} />
          </Modal>
          <button
            className={s.trainingBtn}
            onClick={() => setIsTrainingOpen(true)}
          >
            Add Related Training
          </button>
          <Modal
            isOpen={isTrainingOpen}
            onClose={() => setIsTrainingOpen(false)}
            title="Add Related Training"
          >
            <AddTraining
              closeModal={() => setIsTrainingOpen(false)}
              supervisor
              apprentices={apprentices.filter((app) => app.status === "active")}
            />
          </Modal>
        </div>
      </div>
      <div className={s.staffContainer}>
        {staffData.map((staff) => (
          <StaffMember key={staff.id} user={staff} />
        ))}
      </div>
      <Modal
        isOpen={isHoursOpen}
        onClose={() => setIsHoursOpen(false)}
        title="Add Hours"
      >
        {user && (
          <AddHours
            user={user}
            closeModal={() => setIsHoursOpen(false)}
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
          role={role}
          status={status}
          missingMPR={missingMPR}
          date={dateRange}
          approval={approval}
          clear={clear}
        />
      </Modal>
    </div>
  );
};
