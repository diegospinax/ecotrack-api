import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "../PersonEntity";
import { BadgeEntity } from "./BadgeEntity";

@Entity({ name: "achievements" })
export class AchievementEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "timestamp", name: "date_received" })
    dateReceived!: Date;

    @ManyToOne(() => PersonEntity, (person) => person.achievements)
    @JoinColumn({ name: "person_id" })
    person!: PersonEntity;

    @ManyToOne(() => BadgeEntity, (badge) => badge.achievements)
    @JoinColumn({ name: "badge_id" })
    badge!: BadgeEntity;

}
