import s from "../styles/components/AuthForm.module.scss";
import { Link } from "react-router-dom";
import { InputType } from "../types/input.type";
import { InputBase } from "./InputBase";
import titleBg from "../assets/REJATC-1.png";

/* eslint-disable react/react-in-jsx-scope */
type AuthFormProps = {
  inputData: InputType[];
  title: string;
  btnText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  linkText: string;
  linkURL: string;
  showForgotPassword: boolean;
};

export const AuthForm = ({
  onSubmit,
  inputData,
  title,
  btnText,
  linkText,
  linkURL,
  showForgotPassword,
}: AuthFormProps) => {
  return (
    <div className={s.formContainer}>
      <form className={s.form} onSubmit={onSubmit}>
        <h2 className={s.portal}>LRT Apprenticeship Program Portal</h2>
        <div className={s.titleBg}>
          <div className={s.titleImg}>
            <img src={titleBg} alt="sun" />
          </div>
          <h2
            className={s.title}
            // style={{ backgroundImage: `url(${titleBg})` }}
          >
            {title}
          </h2>
        </div>
        {inputData.map((input) => (
          <InputBase key={input.id} input={input} />
        ))}
        <div className={s.linkContainer}>
          <Link className={s.link} to={linkURL}>
            {linkText}
          </Link>
          {showForgotPassword && (
            <Link className={s.link} to="/forgot-password">
              Forgot Password
            </Link>
          )}
        </div>
        <div className={s.submitBtnContainer}>
          <input className={s.submitBtn} type="submit" value={btnText} />
        </div>
      </form>
    </div>
  );
};
