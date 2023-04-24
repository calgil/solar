/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import s from "../styles/components/Staff.module.scss";
import { StaffMember } from "./StaffMember";
import filter from "../assets/filter.png";
import search from "../assets/search.png";

export const Staff = () => {
  const [searchQuery, setSearchQuery] = useState("");

  //   TODO: Error/loading
  const { users } = useUsers();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={s.staff}>
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
      <div className={s.staffContainer}>
        {filteredUsers.map((user) => (
          <StaffMember key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
