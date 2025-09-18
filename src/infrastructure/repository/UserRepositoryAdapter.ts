import { Repository } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { User } from "@/domain/user/User";
import { AppDataSource } from "../config/database.postgres";
import { UserRepository } from "@/domain/user/ports/UserRepository";
import bcrypt from "node_modules/bcryptjs";
import UserRole from "@/domain/user/value-objects/UserRole";
import UserId from "@/domain/user/value-objects/UserId";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserActive from "@/domain/user/value-objects/UserActive";

export class UserRepositoryAdapter implements UserRepository {
    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async createUser(user: User): Promise<User> {
        try {
            const newUser = await this.toEntity(user);
            const savedUser = await this.userRepository.save(newUser);
            return this.toDomain(savedUser);;
        } catch (error) {
            console.error("Error creating user ", error);
            throw new Error("Error creating user");
        }
    }

    async findById(userId: UserId): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { id_user: userId.value },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return this.toDomain(user);
        } catch (error) {
            console.error("Error fetching user by id: ", error);
            throw new Error("Error fetching user by id");

        }

    }

    async findByEmail(userEmail: UserEmail): Promise<User> {
        try {
            const email = await this.userRepository.findOne({
                where: { email_user: userEmail.value },
            });
            if (!email) {
                throw new Error("Email not found")
            }
            return this.toDomain(email);
        } catch (error) {
            console.error("Error fetching user by email", error);
            throw new Error("Error fetching user by email");

        }

    }

    async updateUser(user: User): Promise<void> {
        try {
            const userUpdate = await this.toEntity(user);
            await this.userRepository.update(userUpdate.id_user, userUpdate);
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    }

    async deleteUser(userId: UserId): Promise<void> {
        try {
            const result = await this.userRepository.delete(userId.value);

            if (result.affected === 0) {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }



    private toDomain(user: UserEntity): User {
        return {
            id: new UserId(user.id_user),
            email: new UserEmail(user.email_user),
            password: new UserPassword(user.password_user),
            role: new UserRole(user.role_user),
            active: new UserActive(user.active_user),

        };
    }

    private async toEntity(user: User): Promise<UserEntity> {
        const userEntity = new UserEntity();
        userEntity.email_user = user.email.value; 
        userEntity.password_user = await this.encryptPassword(user.password.value);
        userEntity.role_user = user.role.value;
        userEntity.active_user = user.active.value;
        return userEntity;
    }

    private async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }



}
