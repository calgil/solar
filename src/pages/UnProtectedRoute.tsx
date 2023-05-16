import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

/* eslint-disable react/react-in-jsx-scope */

const redirectToRoot = (navigate: NavigateFunction) => {
  navigate("/");
};

export const UnProtectedRoute = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return redirectToRoot(navigate);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      return redirectToRoot(navigate);
    }
  }, []);

  return <>{children}</>;
};
