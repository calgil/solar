/* eslint-disable react/react-in-jsx-scope */
import s from "../styles/components/InputBase.module.scss";
import { InputType } from "../types/input.type";

type InputProps = {
  input: InputType;
};

export const InputBase = ({ input }: InputProps) => {
  const { id, type, name, value, placeholder, onChange, autoComplete } = input;
  return (
    <div className={s.inputContainer}>
      <label className={s.label} htmlFor={input.id}>
        {input.labelText}

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
      </label>
    </div>
  );
};
