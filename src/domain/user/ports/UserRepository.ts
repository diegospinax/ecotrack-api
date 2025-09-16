import UserEmail from "../value-objects/UserEmail";
import UserId from "../value-objects/UserId";
import { User } from "./../User";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findById(userId: UserId): Promise<User>;
  findByEmail(email: UserEmail): Promise<User>;
  updateUser(user: User): Promise<void>;
  deleteUser(userId: UserId): Promise<void>;
}
 