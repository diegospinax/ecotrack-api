import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";

export class UdpateUserDto {
    constructor(
        public readonly id: UserId,
        public readonly email?: UserEmail,
        public readonly password?: UserPassword,
        public readonly role?: UserRole,
    ) {}
}