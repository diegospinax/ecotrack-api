import { User } from "@/domain/user/User";
import { CreateUserUseCase } from "./cases/CreateUserUseCase";
import { UserRepository } from "@/domain/user/ports/UserRepository";
import { PasswordEncrypter } from "@/domain/user/ports/PasswordEncrypter";
import { UseCaseValidationException } from "@/application/exception/UserValidationException";
import { FindUserUseCase } from "./cases/FindUserUseCase";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import { DeleteUserUseCase } from "./cases/DeleteUserUseCase";
import { UpdateUserUseCase } from "./cases/UpdateUserUseCase";

export class UserUseCase
  implements
    CreateUserUseCase,
    FindUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase
{
  private repository: UserRepository;
  private encrypter: PasswordEncrypter;

  constructor(repository: UserRepository, encrypter: PasswordEncrypter) {
    this.repository = repository;
    this.encrypter = encrypter;
  }

  public async create(user: Omit<User, "id">): Promise<User> {
    const existingUser = await this.repository.findByEmail(user.email);

    if (existingUser) {
      throw new UseCaseValidationException("Email already registered.");
    }

    const userPasswordEncrypted: Omit<User, "id"> = {
      ...user,
      password: await this.encrypter.encryptPassword(user.password),
    };

    return await this.repository.createUser(userPasswordEncrypted);
  }

  public async findById(userId: UserId): Promise<User> {
    const existingUser = await this.repository.findById(userId);

    if (!existingUser) throw new Error("User does not exists.");

    return existingUser;
  }

  public async findByEmail(userEmail: UserEmail): Promise<User> {
    const existingUser = await this.repository.findByEmail(userEmail);

    if (!existingUser) throw new Error("User does not exists.");

    return existingUser;
  }

  public async delete(userId: UserId): Promise<void> {
    const existingUser = await this.repository.findById(userId);

    if (!existingUser) throw new Error("User not found.");

    await this.repository.deleteUser(userId);
  }

  public async update(userPartial: Partial<User>): Promise<void> {
    const existingUser = await this.repository.findById(userPartial.id!);

    if (!existingUser) throw new Error("User not found.");

    if (userPartial.email && userPartial.email !== existingUser.email)
      await this.validateEmailNotInUse(userPartial.email);

    const userUpdated: User = await this.updateUserFields(userPartial, existingUser);

    return await this.repository.updateUser(userUpdated);
  }

  private async validateEmailNotInUse(userEmail: UserEmail): Promise<void> {
    const userWithEmail = await this.repository.findByEmail(userEmail);

    if (userWithEmail) throw new Error("Email already registered.");
  }

  private async updateUserFields(
    user: Partial<User>,
    existingUser: User
  ): Promise<User> {
    return {
      id: existingUser.id,
      email: user.email ?? existingUser.email,
      password: user.password
        ? await this.encrypter.encryptPassword(user.password)
        : existingUser.password,
      role: user.role ?? existingUser.role,
      isActive: existingUser.isActive,
    };
  }
}
