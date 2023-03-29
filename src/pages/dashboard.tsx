/* eslint-disable react/react-in-jsx-scope */

import { useAuth } from "../firebase/auth/auth.provider";

export default function Dashboard() {
  const { logout } = useAuth();

  const logoutUser = () => {
    logout();
  };
  return (
    <div>
      <h4>Dashboard</h4>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
