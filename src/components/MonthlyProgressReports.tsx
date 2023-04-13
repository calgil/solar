/* eslint-disable react/react-in-jsx-scope */
import { useMprPagination } from "../hooks/useMprPagination";
import s from "../styles/components/MonthlyProgressReports.module.scss";
import { displayDate } from "../utils/displayDate";
import filter from "../assets/filter.png";
import search from "../assets/search.png";
import { useState } from "react";

export const MonthlyProgressReports = () => {
  const { mprs, currentPage, totalPages } = useMprPagination();
  const [searchQuery, setSearchQuery] = useState("");
  console.log({ currentPage, totalPages });

  const filteredMprs = mprs.filter((mpr) =>
    mpr.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
          {filteredMprs.map((mpr) => (
            <tr className={s.row} key={mpr.id}>
              <td>{mpr.username}</td>
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
    </div>
  );
};
