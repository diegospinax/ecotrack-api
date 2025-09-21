import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";
import { UserEntity } from "../../entities/UserEntity";
import { mapEntityToPersonDomain } from "./person-out-mapper";

export const mapUserToDomain = (entity: UserEntity): User => {
  return {
    id: new UserId(entity.id),
    email: new UserEmail(entity.email),
    password: new UserPassword(entity.password),
    role: new UserRole(entity.role),
    person: mapEntityToPersonDomain(entity.person)
  };
};

export const mapUserToEntity = (domain: Omit<User, "id">): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.email = domain.email.value;
  userEntity.password = domain.password.value;
  userEntity.role = domain.role.value;
  return userEntity;
};

export const mapUserUpdateToEntity = (domain: User): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.id = domain.id?.value!;
  userEntity.email = domain.email.value;
  userEntity.password = domain.password.value;
  userEntity.role = domain.role.value;
  return userEntity;
}
