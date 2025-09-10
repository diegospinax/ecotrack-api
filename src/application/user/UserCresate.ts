import { Role } from "./../../domain/user/Role";
import { User } from "@/domain/user/User";
import UserId from "./../../domain/user/value-objects/UserId";
import { UserRepository } from "./../../domain/user/ports/UserRepository";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";
import UserActive from "@/domain/user/value-objects/UserActive";

export class UserCreate {
  constructor(private repository: UserRepository) {}
 
  async run(
    id: number,
    email: string,
    password: string,
    role: Role,
    active: boolean
  ): Promise<User> {
    const user: User = {
      id: new UserId(id),
      email: new UserEmail(email),
      password: new UserPassword(password),
      role: new UserRole(role),
      active: new UserActive(active),
    };

    return this.repository.createUser(user);
  }
}
