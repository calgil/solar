import { useEffect, useState } from "react";
import { User } from "../types/user.type";
import { fetchUsers } from "../firebase/users/fetchUsers";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);
  return { isLoading, users, error };
};
