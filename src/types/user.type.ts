export type User = {
  id: string;
  name: string;
  role: "admin" | "supervisor" | "apprentice";
  supervisorId?: string;
};
