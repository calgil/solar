import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../firebase/auth/auth.provider";
import { Input } from "../types/input.type";

/* eslint-disable react/react-in-jsx-scope */
export default function Register() {
  const { registerUser } = useAuth();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const navigate = useNavigate();

  const inputData: Input[] = [
    {
      id: "username",
      labelText: "Username",
      type: "text",
      name: "username",
      value: usernameInput,
      placeholder: "Username",
      onChange: (e) => setUsernameInput(e.target.value),
      autoComplete: "off",
    },
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
      return console.log("no email or password");
    }
    registerUser(usernameInput, emailInput, passwordInput);
    setUsernameInput("");
    setEmailInput("");
    setPasswordInput("");
    navigate("/");
  };
  return (
    <AuthForm
      inputData={inputData}
      title="Create Account"
      btnText="Create New User"
      onSubmit={registerNewUser}
      linkText="Sign In"
      linkURL="/login"
    />
  );
}
