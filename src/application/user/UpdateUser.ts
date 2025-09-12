import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";

export class UpdateUser {
  constructor(private repository: UserRepository) {}
  async run(user: User): Promise<void> {
    return await this.repository.updateUser(user);
  }
}
