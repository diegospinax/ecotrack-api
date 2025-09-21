import { UdpateUserDto } from "@/application/dto/user/UpdateUserDto";
import { User } from "@/domain/user/User";
import UserId from "@/domain/user/value-objects/UserId";

export interface UpdateUserUseCase {
    update(userDto: UdpateUserDto): Promise<void>;
}