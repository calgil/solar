export type Input = {
  id: string;
  labelText: string;
  type: "email" | "password" | "text";
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: "on" | "off";
};
