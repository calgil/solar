/* eslint-disable react/react-in-jsx-scope */

import { AdminDashboard } from "../components/dashboards/AdminDashboard";
import { ApprenticeDashboard } from "../components/dashboards/ApprenticeDashboard";
import { SupervisorDashboard } from "../components/dashboards/SupervisorDashboard";
import { useAuth } from "../providers/auth.provider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "apprentice" && (
        <ApprenticeDashboard apprenticeId={user.id} />
      )}
      {user?.role === "supervisor" && (
        <SupervisorDashboard supervisorId={user.id} />
      )}
      {user?.role === "admin" && <AdminDashboard />}
    </>
  );
}
