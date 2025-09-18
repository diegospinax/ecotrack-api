import { BadgeTypeEnum } from "@/domain/achievement/badge/BadgeTypeEnum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}  