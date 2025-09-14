import { Role } from "@/domain/user/Role";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id_user!: number;

    @Column({ type: "varchar", length: 255 })
    name_user!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email_user!: string;

    @Column({ type: "varchar", length: 255 })
    password_user!: string;
    
    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role_user!: Role;
    
    @Column({ type: "boolean" })
    active_user!: boolean;
} 