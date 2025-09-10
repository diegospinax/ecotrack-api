import { UserRepository } from "@/domain/user/ports/UserRepository";
import { Role } from "@/domain/user/Role";
import { User } from "@/domain/user/User";
import UserActive from "@/domain/user/value-objects/UserActive";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";

export class UpdateUser {
  constructor(private repository: UserRepository) {}
  async run(
    id: number,
    email: string,
    password: string,
    role: Role,
    active: boolean
  ): Promise<void> {
    const user: User = {
      id: new UserId(id),
      email: new UserEmail(email),
      password: new UserPassword(password),
      role: new UserRole(role),
      active: new UserActive(active),
    };
    return this.repository.updateUser(user);
  }
}
