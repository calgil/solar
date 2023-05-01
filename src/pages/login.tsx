import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../providers/auth.provider";
import { InputType } from "../types/input.type";
import { toast } from "react-toastify";

/* eslint-disable react/react-in-jsx-scope */
export default function Login() {
  const { loginUser } = useAuth();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const navigate = useNavigate();

  const inputData: InputType[] = [
    {
      id: "email",
      labelText: "Email",
      type: "email",
      name: "email",
      value: emailInput,
      placeholder: "Email",
      onChange: (e) => setEmailInput(e.target.value),
      autoComplete: "on",
    },
    {
      id: "password",
      labelText: "Password",
      type: "password",
      name: "password",
      value: passwordInput,
      placeholder: "Password",
      onChange: (e) => setPasswordInput(e.target.value),
      autoComplete: "on",
    },
  ];

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      return toast.error("Please enter email and password");
    }
    loginUser(emailInput, passwordInput);
    navigate("/");
    setEmailInput("");
    setPasswordInput("");
  };
  return (
    <AuthForm
      inputData={inputData}
      title="Sign In"
      btnText="Sign In"
      onSubmit={login}
      linkText="Create Account"
      linkURL="/register"
      showForgotPassword
    />
  );
}
