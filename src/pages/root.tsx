/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
