import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserId from "@/domain/user/value-objects/UserId";

export class UserFindByID {
  constructor(private repository: UserRepository) {}

  async run(userId: UserId): Promise<User> {
    return await this.repository.findById(userId);
  }
}
