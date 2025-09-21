import { Person } from "../person/Person";
import UserEmail from "./value-objects/UserEmail";
import UserId from "./value-objects/UserId";
import UserPassword from "./value-objects/UserPassword";
import UserRole from "./value-objects/UserRole";

export interface User {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  person?: Person
}
