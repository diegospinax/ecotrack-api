import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";

export class UserFindByEmail {
  constructor(private repository: UserRepository) {}

  async run(userEmail: UserEmail): Promise<User> {
    return await this.repository.findByEmail(userEmail);
  }
}
