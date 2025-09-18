import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "achievements" })
export class AchievementEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "timestamp", name: "date_received" })
    dateReceived!: Date;

    @Column({ type: "number", name: "person_id" })
    personId!: number;

    @Column({ type: "number", name: "badge_id" })
    badgeId!: number;

}
