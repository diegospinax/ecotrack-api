import { UserRepository } from "@/domain/user/ports/UserRepository";
import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { UserEntity } from "@/infrastructure/entities/UserEntity";
import {
  mapUserToDomain,
  mapUserToEntity,
  mapUserUpdateToEntity,
} from "@/infrastructure/mapper/user-mapper";
import { Repository } from "typeorm";

export class UserRepositoryAdapter implements UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
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
    const userUpdate = mapUserUpdateToEntity(user);
    await this.userRepository.save(userUpdate);
  }
}
