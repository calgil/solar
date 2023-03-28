/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from "react-router-dom";
import { useAuth } from "../firebase/auth/auth.provider";

export default function Root() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Outlet />
    </div>
  );
}
