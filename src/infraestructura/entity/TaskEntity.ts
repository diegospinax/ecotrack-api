import { Type } from "@/domain/challenge/task/Type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "task" })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id_Task!: number;

    @Column({ type: "string", length: 255 })
    Title_Task!: string;

    @Column({ type: "string", length: 255 })
    Description_Task!: string;

    @Column({
        type: "enum",
        enum: Type,
    })
    Type_Task!: Type;

    @Column({ type: "number" })
    Time_Task!: number;

}