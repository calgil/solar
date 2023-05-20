/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/MonthlyProgressReports.module.scss";
import filter from "../assets/filter.png";
import { useRef, useState } from "react";
import { ApprenticeSearch } from "./ApprenticeSearch";
import { MprTable } from "./MprTable";
// import { PaginationButtons } from "./PaginationButtons";
import { useReactToPrint } from "react-to-print";
import { Modal } from "./Modal";
import { StaffFilter } from "./StaffFilter";
import { useUserData } from "../hooks/useUserData";
import { UserRole, UserStatus } from "../types/user.type";

export const MonthlyProgressReports = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("apprentice");
  const [status, setStatus] = useState<UserStatus>("active");
  const [missingMPR, setMissingMPR] = useState(0);
  const [dateRange, setDateRange] = useState(6);
  const [approval, setApproval] = useState(false);

  const { staffData, fetchStaffByName, handleFilterChange, clear } =
    useUserData();

  const componentRef = useRef(null);

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

    if (!status) {
      return;
    }
    if (!role) {
      return;
    }
    setMissingMPR(missingMPR);
    setRole(role);
    setStatus(status);

    handleFilterChange(role, status, missingMPR, month, approval);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [inputValue, setInputValue] = useState("");

  const handleSelect = (value: string) => {
    setInputValue(value);
    fetchStaffByName(value);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleClearSearch = () => {
    clear();
    setInputValue("");
  };

  return (
    <div className={s.reports}>
      <div className={s.adminActions}>
        <button
          className={s.filterBtn}
          onClick={() => setIsFilterModalOpen(true)}
        >
          <div className={s.filterImg}>
            <img src={filter} alt="filter" />
          </div>
          Filters
        </button>
        <ApprenticeSearch
          onSelect={handleSelect}
          onInputChange={onInputChange}
          inputValue={inputValue}
          clearSearch={handleClearSearch}
        />
        <button className={s.link} onClick={handlePrint}>
          Print Report
        </button>
      </div>
      <MprTable users={staffData} tableRef={componentRef} />
      {/* <PaginationButtons
        totalPages={totalPages}
        prev={prev}
        next={next}
        currentPage={currentPage}
      /> */}
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
          clear={handleClearSearch}
        />
      </Modal>
    </div>
  );
};
