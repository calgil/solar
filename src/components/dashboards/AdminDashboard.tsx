/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/AdminDashboard.module.scss";
// import { AddUser } from "../AddUser";
// import { Modal } from "../Modal";
// import { StaffMember } from "../StaffMember";
import { Staff } from "../Staff";
import { MonthlyProgressReports } from "../MonthlyProgressReports";

export const AdminDashboard = () => {
  const [showAllMprs, setShowAllMprs] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const [searchQuery, setSearchQuery] = useState("");
  // // const [users, setUsers] = useState<User[]>([]);

  // const closeModal = () => setIsModalOpen(false);

  // const { isLoading, users, error } = useUsers();

  // // probably best to add useEffect here to call getUsers and getAllMprs

  // const supervisors = users.filter((user) => user.role === "supervisor");

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.role.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  return (
    <div className={s.container}>
      <div className={s.adminNav}>
        <h2 className={s.title} onClick={() => setShowAllMprs(false)}>
          Administrator Dashboard
        </h2>
        <div className={s.links}>
          <a className={s.link} onClick={() => setShowAllMprs(true)}>
            Monthly Progress Reports
          </a>
        </div>
      </div>
      {showAllMprs && <MonthlyProgressReports />}
      {!showAllMprs && <Staff />}
      {/* <div className={s.adminActions}>
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
        <button className={s.link} onClick={() => setIsModalOpen(true)}>
          Add User
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New User">
          <AddUser supervisors={supervisors} closeModal={closeModal} />
        </Modal>
      </div>
      {/* instead of staff member fetching their data, just pass their mprs as props */}
      {/* <div className={s.usersContainer}>
        {filteredUsers.map((user) => (
          <StaffMember key={user.id} user={user} />
        ))}
      // </div> */}
    </div>
  );
};
