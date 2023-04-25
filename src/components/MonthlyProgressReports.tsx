/* eslint-disable react/react-in-jsx-scope */
import { useMprPagination } from "../hooks/useMprPagination";
import s from "../styles/components/MonthlyProgressReports.module.scss";
import { displayDate } from "../utils/displayDate";
import filter from "../assets/filter.png";
import search from "../assets/search.png";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import { useState } from "react";
import classNames from "classnames/bind";
import { useUsers } from "../hooks/useUsers";
import { ApprenticeSearch } from "./ApprenticeSearch";
import { User } from "../types/user.type";
import { MprTable } from "./mprTable";
import { PaginationButtons } from "./PaginationButtons";
const cx = classNames.bind(s);

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

  const apprenticeNames = users
    .filter((user) => user.role === "apprentice")
    .map((app) => app.name);

  const [inputValue, setInputValue] = useState("");

  const pages = Array.from(Array(totalPages).keys());

  const handleSelect = (value: string) => {
    console.log("fuck!!!!", value);

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
    <div>
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
      </div>
      <MprTable mprs={mprs} />
      <PaginationButtons
        totalPages={totalPages}
        prev={prev}
        next={next}
        currentPage={currentPage}
      />
      {/* <div className={s.paginationContainer}>
        <div className={s.pagination}>
          <button
            className={s.button}
            onClick={prev}
            disabled={currentPage === 1}
          >
            <img src={leftArrow} alt="left arrow" />
          </button>
          <div className={s.pageNumbers}>
            {pages.map((page) => {
              const pageClass = cx({
                pageNum: true,
                selected: page + 1 === currentPage,
              });
              return (
                <div key={page} className={pageClass}>
                  {page + 1}
                </div>
              );
            })}
          </div>
          <button
            className={s.button}
            onClick={next}
            disabled={currentPage === totalPages}
          >
            <img src={rightArrow} alt="right arrow" />
          </button>
        </div>
      </div> */}
    </div>
  );
};
