import UserEmail from "../value-objects/UserEmail";
import UserId from "../value-objects/UserId";
import { User } from "./../User";

export interface UserRepository {
  createUser(user: Omit<User, "id">): Promise<User>;
  findById(userId: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  updateUser(user: User): Promise<void>;
  deleteUser(userId: UserId): Promise<void>;
}
 