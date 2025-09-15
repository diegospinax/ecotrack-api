import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "achievement" })
export class AchievementEntity {
    @PrimaryGeneratedColumn()
    id_achievement!: number;

    @Column({ type: "date" })
    DateReceived_Achievement!: Date;

    @Column({ type: "number" })
    id_Person!: number;

    @Column({ type: "number" })
    id_Badge!: number;

}
