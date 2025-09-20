import { UseCaseException } from "@/application/exception/UseCaseException";
import { PasswordEncrypter } from "@/domain/user/ports/PasswordEncrypter";
import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import { FindUserUseCase } from "./cases/FindUserUseCase";
import { UpdateUserUseCase } from "./cases/UpdateUserUseCase";

export class UserUseCase implements FindUserUseCase, UpdateUserUseCase {

  constructor(private repository: UserRepository, private encrypter: PasswordEncrypter) { }

  public async findById(userId: UserId): Promise<User> {
    const existingUser = await this.repository.findById(userId);

    if (!existingUser) throw new UseCaseException("User does not exists.");

    return existingUser;
  }

  public async findByEmail(userEmail: UserEmail): Promise<User> {
    const existingUser = await this.repository.findByEmail(userEmail);

    if (!existingUser) throw new UseCaseException("User does not exists.");

    return existingUser;
  }

  public async update(userPartial: Partial<User>): Promise<void> {
    const existingUser = await this.repository.findById(userPartial.id!);

    if (!existingUser) throw new UseCaseException("User not found.");

    if (userPartial.email && userPartial.email.value !== existingUser.email.value)
      await this.validateEmailNotInUse(userPartial.email);

    const userUpdated: User = await this.updateUserFields(userPartial, existingUser);

    return await this.repository.updateUser(userUpdated);
  }

  private async validateEmailNotInUse(userEmail: UserEmail): Promise<void> {
    const userWithEmail = await this.repository.findByEmail(userEmail);

    if (userWithEmail) throw new UseCaseException("Email already registered.");
  }

  private async updateUserFields(
    user: Partial<User>,
    existingUser: User
  ): Promise<User> {
    return {
      id: existingUser.id!,
      email: user.email ?? existingUser.email,
      password: user.password
        ? await this.encrypter.encryptPassword(user.password)
        : existingUser.password,
      role: user.role ?? existingUser.role
    };
  }
}
