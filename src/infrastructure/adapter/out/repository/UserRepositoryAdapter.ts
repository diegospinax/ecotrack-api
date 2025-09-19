import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { UserEntity } from "@/infrastructure/entities/UserEntity";
import {
  mapUserToDomain,
  mapUserToEntity,
} from "@/infrastructure/mapper/user-mapper";
import { Repository } from "typeorm";

export class UserRepositoryAdapter implements UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const newUser = mapUserToEntity(user);
    const savedUser = await this.userRepository.save(newUser);
    return mapUserToDomain(savedUser);
  }

  async findById(userId: UserId): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId.value },
    });

    return user ? mapUserToDomain(user) : null;
  }

  async findByEmail(userEmail: UserEmail): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail.value },
    });

    return user ? mapUserToDomain(user) : null;
  }

  async updateUser(user: User): Promise<void> {
    const userUpdate = mapUserToEntity(user);
    await this.userRepository.save(userUpdate);
  }

  async deleteUser(userId: UserId): Promise<void> {
    await this.userRepository
      .createQueryBuilder("user")
      .update({ isActive: false })
      .where("id = :userId", {userId: userId.value})
      .execute();
  }
}
