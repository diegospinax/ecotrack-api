import { CreateUserDto } from "@/application/dto/user/CreateUserDto"
import { UdpateUserDto } from "@/application/dto/user/UpdateUserDto"
import { User } from "@/domain/user/User"
import UserEmail from "@/domain/user/value-objects/UserEmail"
import UserId from "@/domain/user/value-objects/UserId"
import UserPassword from "@/domain/user/value-objects/UserPassword"
import UserRole from "@/domain/user/value-objects/UserRole"
import { UserRequest } from "@/infrastructure/dto/user/UserRequest"
import { UserResponse } from "@/infrastructure/dto/user/UserResponse"

export const mapUserRequestToCreateDto = (user: UserRequest): CreateUserDto => {
    return {
      email: new UserEmail(user.email),
      password: new UserPassword(user.password),
      role: new UserRole(user.role)
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

export const mapUserRequestToUpdateDto = (userRequest: Partial<UserRequest>, userId: UserId): UdpateUserDto => {
  return {
    id: userId,
    ...(userRequest.email && { email: new UserEmail(userRequest.email) }),
    ...(userRequest.password && { password: new UserPassword(userRequest.password) }),
    ...(userRequest.role && { role: new UserRole(userRequest.role) })
  }
}