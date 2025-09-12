import { User } from "@/domain/user/User";
import { UserRepository } from "./../../domain/user/ports/UserRepository";

export class UserCreate {
  constructor(private repository: UserRepository) {}
 
  async run(user: User): Promise<User> {
    return await this.repository.createUser(user);
  }
}
