import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChallengeEntity } from "./ChallengeEntity";
import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";

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
    type!: EcoCategoryEnum;

    @Column({ type: "boolean", name: "is_active" })
    isActive!: boolean;

    @Column({ type: "int", name: "required_repetitions" })
    requiredRepetitions!: number;

    @OneToMany(() => ChallengeEntity, (challenges) => challenges.task, { lazy: true })
    challenges?: Promise<ChallengeEntity[]>;
}