import { TaskTypeEnum } from "../../../domain/challenge/task/TaskTypeEnum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChallengeEntity } from "./ChallengeEntity";

@Entity({ name: "tasks" })
export class TaskEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "varchar", length: 255 })
    description!: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    type!: TaskTypeEnum;

    @Column({ type: "int", name: "required_repetitions" })
    requiredRepetitions!: number;

    @OneToMany(() => ChallengeEntity, (challenges) => challenges.task)
    challenges!: Promise<ChallengeEntity[]>;
}