import { Role } from "@/domain/user/Role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 255 })
    password!: string;

    @Column({
        type: "enum",
        enum: Role,
        enumName: "user_role"
    })
    role!: Role;

    @Column({ type: "boolean", name: "is_active" })
    isActive!: boolean;
} 