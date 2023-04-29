/* eslint-disable react/react-in-jsx-scope */
import { useMprPagination } from "../hooks/useMprPagination";
import s from "../styles/components/MonthlyProgressReports.module.scss";
import filter from "../assets/filter.png";
import { useRef, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { ApprenticeSearch } from "./ApprenticeSearch";
import { MprTable } from "./MprTable";
import { PaginationButtons } from "./PaginationButtons";
import { useReactToPrint } from "react-to-print";

export const MonthlyProgressReports = () => {
  const {
    mprs,
    currentPage,
    totalPages,
    next,
    prev,
    filterByName,
    findSupervisorUnapproved,
    findAdminUnapproved,
    clearSearch,
  } = useMprPagination();

  const { users } = useUsers();

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const apprenticeNames = users
    .filter((user) => user.role === "apprentice")
    .map((app) => app.name);

  const [inputValue, setInputValue] = useState("");

  const handleSelect = (value: string) => {
    setInputValue(value);
    filterByName(value);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const showUnapproved = () => {
    console.log("unapproved");
    findSupervisorUnapproved();
  };

  const showAdminUnapproved = () => {
    console.log("admin");
    findAdminUnapproved();
  };

  const handleClearSearch = () => {
    clearSearch();
    setInputValue("");
  };

  return (
    <div className={s.reports}>
      <div className={s.adminActions}>
        <button className={s.filterBtn}>
          <div className={s.filterImg}>
            <img src={filter} alt="filter" />
          </div>
          Filters
        </button>
        <ApprenticeSearch
          options={apprenticeNames}
          onSelect={handleSelect}
          onInputChange={onInputChange}
          inputValue={inputValue}
        />
        <button onClick={showUnapproved} className={s.link}>
          Supervisor Unapproved
        </button>
        <button onClick={showAdminUnapproved} className={s.link}>
          Admin Unapproved
        </button>
        <button className={s.link} onClick={handleClearSearch}>
          Clear Filters
        </button>
        <button className={s.link} onClick={handlePrint}>
          Print Report
        </button>
      </div>
      <MprTable mprs={mprs} tableRef={componentRef} />
      <PaginationButtons
        totalPages={totalPages}
        prev={prev}
        next={next}
        currentPage={currentPage}
      />
    </div>
  );
};
