import { TaskTypeEnum } from "@/domain/challenge/task/TaskTypeEnum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tasks" })
export class TaskEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "string", length: 255 })
    title!: string;

    @Column({ type: "string", length: 255 })
    description!: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    type!: TaskTypeEnum;

    @Column({ type: "number", name: "required_repetitions" })
    requiredRepetitions!: number;
}