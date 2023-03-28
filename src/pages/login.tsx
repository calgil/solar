import { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../firebase/auth/auth.provider";
import { Input } from "../types/input.type";

/* eslint-disable react/react-in-jsx-scope */
export default function Login() {
  const { loginUser } = useAuth();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const inputData: Input[] = [
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

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      return console.log("must enter email and password");
    }
    loginUser(emailInput, passwordInput);
    setEmailInput("");
    setPasswordInput("");
  };
  return (
    <AuthForm
      inputData={inputData}
      btnText="Login"
      onSubmit={login}
      linkText="No account? Create one"
      linkURL="/register"
    />
  );
}