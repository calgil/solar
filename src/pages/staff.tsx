/* eslint-disable react/react-in-jsx-scope */

import { LoaderFunction, useLoaderData } from "react-router-dom";
import { fetchUserById } from "../firebase/users/fetchUserById";
import { User } from "../types/user.type";
import { ApprenticeDashboard } from "../components/dashboards/ApprenticeDashboard";

export const loader: LoaderFunction = async ({ params }) => {
  if (params.uid) {
    const user = await fetchUserById(params.uid);
    return { user };
  }
  throw new Error("Invalid params");
};

export default function Staff() {
  const { user } = useLoaderData() as Awaited<{ user: User }>;
  return (
    <>
      {user?.role === "apprentice" && (
        <ApprenticeDashboard apprentice={user} edit />
      )}
    </>
  );
}
