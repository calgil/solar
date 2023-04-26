/* eslint-disable react/react-in-jsx-scope */

import { useLoaderData } from "react-router-dom";
import { fetchUserById } from "../firebase/users/fetchUserById";
import { User } from "../types/user.type";

export async function loader({ params }: { params: { uid: string } }) {
  if (params.uid) {
    const user = await fetchUserById(params.uid);
    if (user) {
      return { user };
    }
    throw new Error("Invalid uid");
  }
  throw new Error("Invalid uid");
}

export default function Staff() {
  const { user } = useLoaderData() as { user: User };
  console.log(user);

  return <div>Staff Member </div>;
}
