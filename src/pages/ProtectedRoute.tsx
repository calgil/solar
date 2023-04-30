import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

/* eslint-disable react/react-in-jsx-scope */

const redirectToLogin = (navigate: NavigateFunction) => {
  navigate("/login");
};
export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return redirectToLogin(navigate);
    }
  }, [user]);
  return <>{user ? children : null}</>;
};
