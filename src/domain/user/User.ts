import UserEmail from "./value-object/UserEmail";
import UserPassword from "./value-object/UserPassword";
import UserRole from "./value-object/UserRole";

export interface User {
  id?: number;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  active: boolean;
}
