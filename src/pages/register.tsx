import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../providers/auth.provider";
import { InputType } from "../types/input.type";
import { toast } from "react-toastify";

/* eslint-disable react/react-in-jsx-scope */
export default function Register() {
  const { registerUser } = useAuth();
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
      autoComplete: "off",
    },
    {
      id: "password",
      labelText: "Password",
      type: "password",
      name: "password",
      value: passwordInput,
      placeholder: "Password",
      onChange: (e) => setPasswordInput(e.target.value),
      autoComplete: "off",
    },
  ];

  const registerNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      return toast.error("Please enter email and password");
    }
    registerUser(emailInput, passwordInput);
    setEmailInput("");
    setPasswordInput("");
    navigate("/");
  };
  return (
    <AuthForm
      inputData={inputData}
      title="Create Account"
      btnText="Create My Account"
      onSubmit={registerNewUser}
      linkText="Sign In"
      linkURL="/login"
      showForgotPassword
    />
  );
}
