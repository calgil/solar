import { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../firebase/auth/auth.provider";
import { Input } from "../types/input.type";

/* eslint-disable react/react-in-jsx-scope */
export default function Register() {
  const { registerUser } = useAuth();
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const inputData: Input[] = [
    {
      id: "username",
      labelText: "Username:",
      type: "text",
      name: "username",
      value: usernameInput,
      onChange: (e) => setUsernameInput(e.target.value),
      autoComplete: "off",
    },
    {
      id: "email",
      labelText: "Email:",
      type: "email",
      name: "email",
      value: emailInput,
      onChange: (e) => setEmailInput(e.target.value),
      autoComplete: "off",
    },
    {
      id: "password",
      labelText: "Password:",
      type: "password",
      name: "password",
      value: passwordInput,
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
  };
  return (
    <AuthForm
      inputData={inputData}
      btnText="Create New User"
      onSubmit={registerNewUser}
      linkText="Already have an account? Login here"
      linkURL="/login"
    />
  );
}
