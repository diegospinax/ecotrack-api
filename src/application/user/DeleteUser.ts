import { UserRepository } from "@/domain/user/ports/UserRepository";
import UserId from "@/domain/user/value-objects/UserId";

export class DeleteUser {
  constructor(private repository: UserRepository) {}

  async run(userid: UserId): Promise<void> {
    await this.repository.deleteUser(userid);
  }
}
