/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../styles/components/EditUser.module.scss";
import { User } from "../types/user.type";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

type EditUserProps = {
  userToEdit: User;
  closeModal: () => void;
};

export const EditUser = ({ userToEdit, closeModal }: EditUserProps) => {
  const [name, setName] = useState(userToEdit.name);

  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userRef = doc(db, "users", userToEdit.id);
    await updateDoc(userRef, { name });
    closeModal();
  };
  return (
    <form className={s.editUser} onSubmit={updateUserInfo}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className={s.submitContainer}>
        <input className={s.submitBtn} type="submit" value="Edit Profile" />
      </div>
    </form>
  );
};
