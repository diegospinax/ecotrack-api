import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";

export class CreateUserDto {
    constructor(
        public readonly email: UserEmail,
        public readonly password: UserPassword,
        public readonly role: UserRole
    ) { }
}