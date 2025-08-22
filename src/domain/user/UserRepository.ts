import type { User } from "./User";
import type UserEmail from "./value-object/UserEmail";

export interface UserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findByEmail(email: UserEmail): Promise<User | null>;
  update(user: User): Promise<void>;
  deleteById(id: number): Promise<void>;
}