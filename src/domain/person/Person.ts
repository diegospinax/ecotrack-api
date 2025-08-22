import type { User } from "../user/User";

export interface Person {
  id: number;
  user: User;
  name: string;
  lastName: string;
  area: EmployeeArea;
  profilePicture: string;
}

export type EmployeeArea = "human_resources" | "finance" | "operations";