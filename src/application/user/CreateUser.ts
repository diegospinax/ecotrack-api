import { User } from "@/domain/user/User";
import { UserRepository } from "../../domain/user/ports/UserRepository";
import { UseCaseValidationException } from "../exception/UserValidationException";

export class UserCreate {
  constructor(private repository: UserRepository) {}
 
  async run(user: User): Promise<User> {

  const existingUser: User = await this.repository.findByEmail(user.email);

  if(existingUser){
    throw new UseCaseValidationException("User email already registered.");
  }
  
    return await this.repository.createUser(user);
  }
}
