/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { fetchUsers } from "../../firebase/users/fetchUsers";
import s from "../../styles/components/AdminDashboard.module.scss";
import { User } from "../../types/user.type";
import { AddUser } from "../AddUser";
import { Modal } from "../Modal";
import { StaffMember } from "../StaffMember";
import filter from "../../assets/filter.png";
import search from "../../assets/search.png";

export const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const closeModal = () => setIsModalOpen(false);

  const getUsers = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  };

  if (!users.length) {
    getUsers();
  }

  const supervisors = users.filter((user) => user.role === "supervisor");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Administrator Dashboard</h2>
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
        <button className={s.addBtn} onClick={() => setIsModalOpen(true)}>
          Add User
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New User">
          <AddUser supervisors={supervisors} />
        </Modal>
      </div>
      <div className={s.usersContainer}>
        {filteredUsers.map((user) => (
          <StaffMember key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
