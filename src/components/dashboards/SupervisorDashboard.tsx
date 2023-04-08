/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import s from "../../styles/components/SupervisorDashboard.module.scss";
import { User } from "../../types/user.type";
import { fetchUsers } from "../../firebase/users/fetchUsers";
import { useAuth } from "../../firebase/auth/auth.provider";
import { StaffMember } from "../StaffMember";

export const SupervisorDashboard = () => {
  const { user } = useAuth();

  const [apprentices, setApprentices] = useState<User[]>([]);

  const getApprentices = async () => {
    if (!user) {
      return;
    }
    const apprenticeData = await fetchUsers(user.id);
    setApprentices(apprenticeData);
  };

  if (!apprentices.length) {
    getApprentices();
  }
  return (
    <div>
      Supervisor Dashboard
      <div className={s.apprenticeContainer}>
        {apprentices.map((app) => (
          <StaffMember key={app.id} user={app} />
        ))}
      </div>
    </div>
  );
};
