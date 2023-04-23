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
  } = useMprPagination();

  const [searchQuery, setSearchQuery] = useState("");

  const pages = Array.from(Array(totalPages).keys());

  // TODO: actually query the database for mprs that match query

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const findAllByName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("search for name", searchQuery);
    filterByName(searchQuery);
  };

  const showUnapproved = () => {
    console.log("unapproved");
    findSupervisorUnapproved();
  };

  const showAdminUnapproved = () => {
    console.log("admin");
    findAdminUnapproved();
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
        <div className={s.searchContainer}>
          <form onSubmit={findAllByName}>
            <input
              className={s.filterInput}
              type="text"
              placeholder="Filter Staff"
              onChange={handleSearchQueryChange}
            />
          </form>
          <div className={s.searchImg}>
            <img src={search} alt="search" />
          </div>
        </div>
        <button onClick={showUnapproved} className={s.link}>
          Supervisor Unapproved
        </button>
        <button onClick={showAdminUnapproved} className={s.link}>
          Admin Unapproved
        </button>
      </div>
      <table className={s.table}>
        <thead className={s.headers}>
          <tr className={s.row}>
            <th>Name</th>
            <th>Date</th>
            <th>Total Time</th>
            <th>PS Hours</th>
            <th>ORES Hours</th>
            <th>BOS Hours</th>
            <th>Other Hours</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody className={s.body}>
          {mprs.map((mpr) => (
            <tr className={s.row} key={mpr.id}>
              <td>{mpr.apprenticeName}</td>
              <td>{displayDate(mpr.date)}</td>
              <td>{mpr.totalHours}</td>
              <td>{mpr.psHours}</td>
              <td>{mpr.oresHours}</td>
              <td>{mpr.bosHours}</td>
              <td>{mpr.otherHours}</td>
              <td>{mpr.supervisorSignature ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.paginationContainer}>
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
      </div>
      {/* <PaginationButtons /> */}
    </div>
  );
};
