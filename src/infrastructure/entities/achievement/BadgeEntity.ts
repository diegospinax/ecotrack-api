import { Type } from "@/domain/achievement/badge/Type";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "badge" })
export class BadgeEntity {
    @PrimaryColumn()
    id_badge!: number;

    @Column({ type: "varchar", length: 255 })
    name_badge!: string;

    @Column({ type: "varchar", length: 255 })
    description_badge!: string;

    @Column({
        type: "enum",
        enum: Type
    })
    type_badge!: Type;


}  