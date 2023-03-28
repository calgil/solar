import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./firebase/auth/auth.provider";

/* eslint-disable react/react-in-jsx-scope */

const redirectToLogin = (navigate: any) => {
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
  }, []);
  return <>{user ? children : null}</>;
};
