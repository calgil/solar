/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { createPendingUser } from "../firebase/pendingUsers/createPendingUser";
import s from "../styles/components/AddUser.module.scss";
import { User } from "../types/user.type";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

const cx = classNames.bind(s);

type AddUserProps = {
  supervisors: User[];
};

export const AddUser = ({ supervisors }: AddUserProps) => {
  const [newUserRole, setNewUserRole] = useState<string>("");
  const [newUserSupervisor, setNewUserSupervisor] = useState("");
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!newUserRole || !newUserEmail || !newUserName) {
      return console.log("Please input role, and email");
    }

    if (newUserRole === "apprentice" && !newUserSupervisor) {
      return console.log("Apprentice must have supervisor");
    }

    console.log("supervisor", newUserSupervisor);

    createPendingUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      supervisor: newUserSupervisor,
    })
      .then((success) => {
        console.log(success);
        toast.success("New User added");
        setNewUserRole("");
        setNewUserName("");
        setNewUserEmail("");
        setIsSubmitted(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Could not create user");
      });
    // TODO: add toast for success / failure
  };

  const roleClass = cx({
    label: true,
    invalid: !newUserRole && isSubmitted,
    valid: !isSubmitted || newUserRole,
  });

  const supervisorClass = cx({
    label: true,
    invalid: newUserRole === "apprentice" && isSubmitted,
    valid: !isSubmitted || (newUserRole === "apprentice" && !newUserSupervisor),
  });

  const nameClass = cx({
    label: true,
    invalid: !newUserName && isSubmitted,
    valid: !isSubmitted || newUserName,
  });

  const emailClass = cx({
    label: true,
    invalid: isSubmitted && !newUserEmail,
    valid: !isSubmitted || newUserEmail,
  });

  return (
    <form className={s.addUser} onSubmit={addUser} noValidate>
      <label className={roleClass} htmlFor="role">
        Role
        <select
          className={s.input}
          name="role"
          id="role"
          onChange={(e) => setNewUserRole(e.target.value)}
          value={newUserRole}
          required
        >
          <option value="">Please Select Role</option>
          <option value="apprentice">Apprentice</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      {newUserRole === "apprentice" && (
        <label className={supervisorClass} htmlFor="supervisor">
          Supervisor
          <select
            className={s.input}
            name="supervisor"
            id="supervisor"
            onChange={(e) => setNewUserSupervisor(e.target.value)}
            required
          >
            <option value="">Please Select a Supervisor</option>
            {supervisors.map((supervisor) => (
              <option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className={nameClass} htmlFor="name">
        Name *
        {!newUserName && isSubmitted && (
          <span className={s.error}>Please enter a name</span>
        )}
        <input
          className={s.input}
          id="name"
          type="text"
          onChange={(e) => setNewUserName(e.target.value)}
          value={newUserName}
          required
        />
      </label>
      <label className={emailClass} htmlFor="email">
        Email *
        {!newUserEmail && isSubmitted && (
          <span className={s.error}>Please enter a valid email</span>
        )}
        <input
          className={s.input}
          id="email"
          type="email"
          onChange={(e) => setNewUserEmail(e.target.value)}
          value={newUserEmail}
          required
        />
      </label>

      <div className={s.submitContainer}>
        <input className={s.submitBtn} type="submit" value="Add User" />
      </div>
    </form>
  );
};
