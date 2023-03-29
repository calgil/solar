import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "./firebase/auth/auth.provider";

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
    console.log("use effect", user);

    if (user) {
      console.log("logged in dummy", user);
      return redirectToRoot(navigate);
    }
  }, [user]);

  useEffect(() => {
    console.log("ahhh!", user);
    if (user) {
      return redirectToRoot(navigate);
    }
  }, []);

  return <>{children}</>;
};
