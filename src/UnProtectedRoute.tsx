import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "./firebase/auth/auth.provider";

/* eslint-disable react/react-in-jsx-scope */

// const redirectToRoot = (navigate: NavigateFunction) => {
//   navigate("/");
// };
export const UnProtectedRoute = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useAuth();
  console.log("ahhh!", user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);
  return <>{children}</>;
};
