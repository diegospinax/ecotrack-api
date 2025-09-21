import { PasswordEncrypter } from "@/domain/user/ports/PasswordEncrypter";
import { User } from "@/domain/user/User";
import { UdpateUserDto } from "../dto/user/UpdateUserDto";

export async function updateUserFieldsFromDto(userDto: UdpateUserDto, existingUser: User, encrypter: PasswordEncrypter): Promise<User> {
    return {
        id: existingUser.id,
        email: userDto.email ?? existingUser.email,
        password: userDto.password
            ? await encrypter.encryptPassword(userDto.password)
            : existingUser.password,
        role: userDto.role ?? existingUser.role
    };
}