/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/InputBase.module.scss";
import { Input } from "../types/input.type";

type InputProps = {
  input: Input;
};

export const InputBase = ({ input }: InputProps) => {
  const { id, type, name, value, placeholder, onChange, autoComplete } = input;
  return (
    <div className={s.inputContainer}>
      <label className={s.label} htmlFor={input.id}>
        {input.labelText}
      </label>
      <input
        className={s.input}
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
};
