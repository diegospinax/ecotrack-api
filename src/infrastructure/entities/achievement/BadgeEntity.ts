import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BadgeTypeEnum } from "../../../domain/achievement/badge/BadgeTypeEnum";
import { AchievementEntity } from "./AchievementEntity";

@Entity({ name: "badges" })
export class BadgeEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255 })
    description!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    type!: BadgeTypeEnum;

    @OneToMany(() => AchievementEntity, (achievements) => achievements.badge)
    achievements!: Promise<AchievementEntity[]>;
}  