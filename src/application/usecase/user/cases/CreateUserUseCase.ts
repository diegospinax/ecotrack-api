import { User } from "@/domain/user/User";

export interface CreateUserUseCase {
    create(user: Omit<User, "id">): Promise<User>;
}