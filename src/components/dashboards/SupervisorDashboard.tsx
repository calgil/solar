/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!user) {
      return;
    }
    getApprentices();
  }, [user]);

  return (
    <div className={s.apprenticeSummary}>
      <h2 className={s.title}>Apprentice Summary</h2>
      <div className={s.apprenticeContainer}>
        {apprentices.map((app) => (
          <StaffMember key={app.id} user={app} />
        ))}
      </div>
    </div>
  );
};
