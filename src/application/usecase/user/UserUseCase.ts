import { UdpateUserDto } from "@/application/dto/user/UpdateUserDto";
import { UseCaseException } from "@/application/exception/UseCaseException";
import { PasswordEncrypter } from "@/domain/user/ports/PasswordEncrypter";
import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import { FindUserUseCase } from "./cases/FindUserUseCase";
import { UpdateUserUseCase } from "./cases/UpdateUserUseCase";
import { updateUserFieldsFromDto } from "@/application/util/user-usecase-util";

export class UserUseCase implements FindUserUseCase, UpdateUserUseCase {

  constructor(private repository: UserRepository, private encrypter: PasswordEncrypter) { }

  public async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  public async findById(userId: UserId): Promise<User> {
    const existingUser = await this.validateExistingUserById(userId);

    return existingUser;
  }

  public async findByEmail(userEmail: UserEmail): Promise<User> {
    const existingUser = await this.repository.findByEmail(userEmail);

    if (!existingUser) throw new UseCaseException("User does not exists.");

    return existingUser;
  }

  public async update(userDto: UdpateUserDto): Promise<void> {
    const existingUser = await this.validateExistingUserById(userDto.id);

    if (userDto.email && userDto.email.value !== existingUser.email.value)
      await this.validateEmailNotInUse(userDto.email);

    const userUpdated: User = await updateUserFieldsFromDto(userDto, existingUser, this.encrypter);

    return await this.repository.updateUser(userUpdated);
  }

  private async validateEmailNotInUse(userEmail: UserEmail): Promise<void> {
    const userWithEmail = await this.repository.findByEmail(userEmail);

    if (userWithEmail) throw new UseCaseException("Email already registered.");
  }

  private async validateExistingUserById(userId: UserId): Promise<User> {
    const existingUser = await this.repository.findById(userId);

    if (!existingUser) throw new UseCaseException("User not found.");

    return existingUser;
  }
}
