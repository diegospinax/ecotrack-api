import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./TaskEntity";
import { PersonEntity } from "../PersonEntity";

@Entity({ name: "challenges" })
export class ChallengeEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "boolean", name: "is_finished" })
    isFinished!: boolean;

    @Column({ type: "int", name: "times_done" })
    timesDone!: number;

    @Column({ type: "bigint", name: "person_id" })
    personId!: number;

    @ManyToOne(() => PersonEntity, (person) => person.challenges, { eager: true })
    person!: PersonEntity;

    @ManyToOne(() => TaskEntity, (task) => task.challenges, { eager: true })
    task!: TaskEntity;
}  