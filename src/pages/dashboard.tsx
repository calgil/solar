/* eslint-disable react/react-in-jsx-scope */

import { AdminDashboard } from "../components/dashboards/AdminDashboard";
import { ApprenticeDashboard } from "../components/dashboards/ApprenticeDashboard";
import { SupervisorDashboard } from "../components/dashboards/SupervisorDashboard";
import { useAuth } from "../firebase/auth/auth.provider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "apprentice" && <ApprenticeDashboard />}
      {user?.role === "supervisor" && <SupervisorDashboard />}
      {user?.role === "admin" && <AdminDashboard />}
    </>
  );
}
