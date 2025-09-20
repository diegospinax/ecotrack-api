import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";
import { UserRequest } from "../dto/user/UserRequest";
import { UserResponse } from "../dto/user/UserResponse";
import { UserEntity } from "../entities/UserEntity";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";

export const mapUserToDomain = (entity: UserEntity): User => {
  return {
    id: new UserId(entity.id),
    email: new UserEmail(entity.email),
    password: new UserPassword(entity.password),
    role: new UserRole(entity.role),
    person: {
      id: new PersonId(entity.person.id),
      name: new PersonName(entity.person.name),
      lastName: new PersonLastName(entity.person.lastName),
      area: new PersonArea(entity.person.area),
      profilePicture: new PersonProfilePicture(entity.person.profilePicture),
      isActive: new PersonIsActive(entity.person.isActive)
    }
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

export const mapUserRequestToDomain = (dto: UserRequest): Omit<User, "id"> => {
  return {
    email: new UserEmail(dto.email),
    password: new UserPassword(dto.password),
    role: new UserRole(dto.role)
  }
}

export const mapUserDomainToResponse = (user: User): UserResponse => {
  return {
    id: user.id?.value!,
    email: user.email.value,
    role: user.role.value,
    personId: user.person?.id.value!
  }
}
