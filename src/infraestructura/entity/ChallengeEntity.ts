import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "challenge" })
export class ChallengeEntity {
    @PrimaryGeneratedColumn()
    id_Challenge!: number;

    @Column({ type: "boolean" })
    Status_Challenge!: boolean;

    @Column({ type: "number" })
    Time_Challenge!: number;

    @Column({ type: "number" })
    id_Person!: number;
    
    @Column({ type: "number" })
    id_Task!: number;

}  