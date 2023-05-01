import { useEffect, useState } from "react";
import { User } from "../types/user.type";
import { fetchUsers } from "../firebase/users/fetchUsers";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apprentices, setApprentices] = useState<User[]>([]);
  const [supervisors, setSupervisors] = useState<User[]>([]);
  const [error, setError] = useState(null);

  const getUsers = () => {
    Promise.all([fetchUsers(), fetchUsers("supervisor")])
      .then(([apprenticesData, supervisorsData]) => {
        setApprentices(apprenticesData);
        setSupervisors(supervisorsData);
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

  return { isLoading, apprentices, supervisors, error };
};
