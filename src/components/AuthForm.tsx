import s from "../styles/components/AuthForm.module.scss";
import { Link } from "react-router-dom";
import { Input } from "../types/input.type";
import { InputBase } from "./InputBase";
import titleBg from "../assets/REJATC-1.png";

/* eslint-disable react/react-in-jsx-scope */
type AuthFormProps = {
  inputData: Input[];
  title: string;
  btnText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  linkText: string;
  linkURL: string;
};

export const AuthForm = ({
  onSubmit,
  inputData,
  title,
  btnText,
  linkText,
  linkURL,
}: AuthFormProps) => {
  return (
    <div className={s.formContainer}>
      <form className={s.form} onSubmit={onSubmit}>
        <div className={s.titleBg}>
          <h2
            className={s.title}
            style={{ backgroundImage: `url(${titleBg})` }}
          >
            {title}
          </h2>
        </div>
        {inputData.map((input) => (
          <InputBase key={input.id} input={input} />
        ))}
        <Link className={s.link} to={linkURL}>
          {linkText}
        </Link>
        <div className={s.submitBtnContainer}>
          <input className={s.submitBtn} type="submit" value={btnText} />
        </div>
      </form>
    </div>
  );
};
