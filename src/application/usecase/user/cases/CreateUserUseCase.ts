import { User } from "@/domain/user/User";

export interface CreateUserUseCase {
    create(user: User): Promise<User>;
}