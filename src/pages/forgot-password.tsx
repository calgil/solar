/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { InputType } from "../types/input.type";
import { AuthForm } from "../components/AuthForm";
import { useAuth } from "../providers/auth.provider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [emailInput, setEmailInput] = useState("");
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
  ];

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput) {
      return toast.error("Please add email");
    }
    forgotPassword(emailInput);
    setEmailInput("");
    navigate("/login");
  };
  return (
    <AuthForm
      inputData={inputData}
      title="Forgot Password"
      btnText="Send Reset Email"
      onSubmit={handleForgotPassword}
      linkText="Sign In"
      linkURL="/login"
      showForgotPassword={false}
    />
  );
}
