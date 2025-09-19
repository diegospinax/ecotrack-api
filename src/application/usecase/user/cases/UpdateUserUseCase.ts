import { User } from "@/domain/user/User";
import UserId from "@/domain/user/value-objects/UserId";

export interface UpdateUserUseCase {
    update(userPartial: Partial<User>): Promise<void>;
}