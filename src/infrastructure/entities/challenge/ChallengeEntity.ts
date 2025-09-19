import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({ type: "bigint", name: "task_id" })
    taskId!: number;

}  