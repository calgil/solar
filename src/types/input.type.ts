export type InputType = {
  id: string;
  labelText: string;
  type: "email" | "password" | "text" | "number";
  name: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: "on" | "off";
};
