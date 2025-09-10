import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";

export class UserFindByEmail {
  constructor(private repository: UserRepository) {}

  async run(email: string): Promise<User> {
    return this.repository.findByEmail(new UserEmail(email));
  }
}
