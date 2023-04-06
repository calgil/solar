/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { createPendingUser } from "../firebase/pendingUsers/createPendingUser";
import s from "../styles/components/AddUser.module.scss";
import { User } from "../types/user.type";

type AddUserProps = {
  supervisors: User[];
};

export const AddUser = ({ supervisors }: AddUserProps) => {
  const [newUserRole, setNewUserRole] = useState<string>("");
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUserRole || !newUserEmail) {
      return console.log("Please input role, and email");
    }

    createPendingUser({
      email: newUserEmail,
      role: newUserRole,
    }).then((success) => console.log(success));
    // TODO: add toast for success / failure

    setNewUserRole("");
    setNewUserName("");
    setNewUserEmail("");
  };

  return (
    <form className={s.addUser} onSubmit={addUser}>
      <label htmlFor="role">
        Role
        <select
          className={s.input}
          name="role"
          id="role"
          onChange={(e) => setNewUserRole(e.target.value)}
          value={newUserRole}
        >
          <option value="">Please Select Role</option>
          <option value="apprentice">Apprentice</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      {newUserRole === "apprentice" && (
        <label htmlFor="supervisor">
          Supervisor
          <select className={s.input} name="supervisor" id="supervisor">
            {supervisors.map((supervisor) => (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label htmlFor="name">Name *</label>
      <input
        className={s.input}
        id="name"
        type="text"
        onChange={(e) => setNewUserName(e.target.value)}
        value={newUserName}
      />
      <label htmlFor="email">Email *</label>
      <input
        className={s.input}
        id="email"
        type="email"
        onChange={(e) => setNewUserEmail(e.target.value)}
        value={newUserEmail}
      />
      <input className={s.submitBtn} type="submit" value="Add User" />
    </form>
  );
};
