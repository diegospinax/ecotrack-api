import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserId from "@/domain/user/value-objects/UserId";

export class UserFindByID {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<User> {
    return this.repository.findById(new UserId(id));
  }
}
