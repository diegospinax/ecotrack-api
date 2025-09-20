import UserEmail from "../value-objects/UserEmail";
import UserId from "../value-objects/UserId";
import { User } from "./../User";

export interface UserRepository {
  findById(userId: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  updateUser(user: User): Promise<void>;
}
 