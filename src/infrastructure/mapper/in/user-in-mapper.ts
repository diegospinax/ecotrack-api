import { User } from "@/domain/user/User"
import UserEmail from "@/domain/user/value-objects/UserEmail"
import UserPassword from "@/domain/user/value-objects/UserPassword"
import UserRole from "@/domain/user/value-objects/UserRole"
import { UserRequest } from "@/infrastructure/dto/user/UserRequest"
import { UserResponse } from "@/infrastructure/dto/user/UserResponse"

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