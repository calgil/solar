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
  closeModal: () => void;
};

export const AddUser = ({ supervisors, closeModal }: AddUserProps) => {
  const [newUserRole, setNewUserRole] = useState<string>("");
  const [newUserSupervisor, setNewUserSupervisor] = useState("");
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!newUserRole || !newUserEmail || !newUserName) {
      return;
    }

    if (newUserRole === "apprentice" && !newUserSupervisor) {
      return;
    }

    createPendingUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      supervisor: newUserSupervisor,
    })
      .then(() => {
        toast.success("New User added");
        setNewUserRole("");
        setNewUserSupervisor("");
        setNewUserName("");
        setNewUserEmail("");
        setIsSubmitted(false);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Could not create user");
      });
  };

  const roleClass = cx({
    label: true,
    invalid: !newUserRole && isSubmitted,
  });

  const supervisorClass = cx({
    label: true,
    invalid: newUserRole === "apprentice" && !newUserSupervisor && isSubmitted,
  });

  const nameClass = cx({
    label: true,
    invalid: !newUserName && isSubmitted,
  });

  const emailClass = cx({
    label: true,
    invalid: isSubmitted && !newUserEmail,
  });

  return (
    <form className={s.addUser} onSubmit={addUser} noValidate>
      <label className={roleClass} htmlFor="role">
        Role *
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
          Supervisor *
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
        <input
          className={s.input}
          id="name"
          type="text"
          onChange={(e) => setNewUserName(e.target.value)}
          value={newUserName}
          required
          placeholder={!newUserName && isSubmitted ? "Please enter name" : ""}
        />
      </label>
      <label className={emailClass} htmlFor="email">
        Email *
        <input
          className={s.input}
          id="email"
          type="email"
          onChange={(e) => setNewUserEmail(e.target.value)}
          value={newUserEmail}
          required
          placeholder={!newUserEmail && isSubmitted ? "Please enter email" : ""}
        />
      </label>

      <div className={s.submitContainer}>
        <input className={s.submitBtn} type="submit" value="Add User" />
      </div>
    </form>
  );
};
