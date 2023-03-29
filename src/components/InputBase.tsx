/* eslint-disable react/react-in-jsx-scope */

import { Input } from "../types/input.type";

type InputProps = {
  input: Input;
};

export const InputBase = ({ input }: InputProps) => {
  return (
    <div>
      <label htmlFor={input.id}>{input.labelText}</label>
      <input
        id={input.id}
        type={input.type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        autoComplete={input.autoComplete}
      />
    </div>
  );
};
