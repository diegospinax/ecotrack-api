import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AchievementEntity } from "./AchievementEntity";
import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";

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
    type!: EcoCategoryEnum;

    @Column({ type: "boolean", name: "is_active" })
    isActive!: boolean;

    @OneToMany(() => AchievementEntity, (achievements) => achievements.badge, { lazy: true })
    achievements?: Promise<AchievementEntity[]>;
}  