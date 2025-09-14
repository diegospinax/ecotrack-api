import { Type } from "@/domain/challenge/task/Type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id_Task!: number;

    @Column({ type: "string" })
    Title_Task!: string;

    @Column({ type: "string" })
    Description_Task!: string;

    @Column({
        type: "number",
        enum: Type,
    })

    @Column({ type: "number" })
    Time_Task!: number;

}