import UserId from "@/domain/user/value-objects/UserId";

export interface DeleteUserUseCase {
    delete(userId: UserId): Promise<void>;
}