import { useEffect, useState } from "react";
import { User } from "../types/user.type";
import { fetchUsers } from "../firebase/users/fetchUsers";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);

  const getUsers = () => {
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  return { isLoading, users, error };
};
