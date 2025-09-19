import { User } from "@/domain/user/User";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";

export interface FindUserUseCase {
    findById(userId: UserId): Promise<User>;
    findByEmail(userEmail: UserEmail): Promise<User>;
}