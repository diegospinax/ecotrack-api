import { User } from "@/domain/user/User";
import { UserEntity } from "../entities/UserEntity";
import UserId from "@/domain/user/value-objects/UserId";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";
import UserIsActive from "@/domain/user/value-objects/UserIsActive";
import bcrypt from "bcryptjs";
import { UserRequest } from "../dto/user/UserRequest";
import { UserResponse } from "../dto/user/UserResponse";

export const mapUserToDomain = (entity: UserEntity): User => {
  return {
    id: new UserId(entity.id),
    email: new UserEmail(entity.email),
    password: new UserPassword(entity.password),
    role: new UserRole(entity.role),
    isActive: new UserIsActive(entity.isActive),
  };
};

export const mapUserToEntity = (domain: Omit<User, "id">): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.email = domain.email.value;
  userEntity.password = domain.password.value;
  userEntity.role = domain.role.value;
  userEntity.isActive = domain.isActive.value;
  return userEntity;
};

export const mapUserUpdateToEntity = (domain: User): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.id = domain.id.value;
  userEntity.email = domain.email.value;
  userEntity.password = domain.password.value;
  userEntity.role = domain.role.value;
  userEntity.isActive = domain.isActive.value;
  return userEntity;
}

export const mapCreateToDomain = (dto: UserRequest): Omit<User, "id"> => {
  return {
    email: new UserEmail(dto.email),
    password: new UserPassword(dto.password),
    role: new UserRole(dto.role),
    isActive: new UserIsActive(true)
  }
}

export const mapToResponse = (user: User): UserResponse => {
  return {
    id: user.id.value,
    email: user.email.value,
    role: user.role.value,
    isActive: user.isActive.value
  }
}
