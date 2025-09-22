import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "../PersonEntity";
import { TaskEntity } from "./TaskEntity";

@Entity({ name: "challenges" })
export class ChallengeEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "boolean", name: "is_finished" })
    isFinished!: boolean;

    @Column({ type: "int", name: "times_done" })
    timesDone!: number;

    @ManyToOne(() => PersonEntity, (person) => person.challenges)
    @JoinColumn({ name: "person_id" })
    person!: PersonEntity;

    @ManyToOne(() => TaskEntity, (task) => task.challenges)
    @JoinColumn({ name: "task_id" })
    task!: TaskEntity;
}  