export type User = {
  id: string;
  name: string;
  role: "admin" | "supervisor" | "apprentice";
  supervisorId?: string;
  status: "active" | "archived" | "graduated";
};

export type UserRole = "apprentice" | "supervisor" | "admin";

export type UserStatus = "active" | "graduated" | "archived";
