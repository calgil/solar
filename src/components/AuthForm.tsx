import { Link } from "react-router-dom";
import { Input } from "../types/input.type";
import { InputBase } from "./InputBase";

/* eslint-disable react/react-in-jsx-scope */
type AuthFormProps = {
  inputData: Input[];
  btnText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  linkText: string;
  linkURL: string;
};

export const AuthForm = ({
  onSubmit,
  inputData,
  btnText,
  linkText,
  linkURL,
}: AuthFormProps) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        {inputData.map((input) => (
          <InputBase key={input.id} input={input} />
        ))}
        <input type="submit" value={btnText} />
      </form>
      <Link to={linkURL}>{linkText}</Link>
    </>
  );
};
