import { Area } from "@/domain/person/Area";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "person" })
export class PersonEntity {
    @PrimaryGeneratedColumn()
    id_Person!: number;

    @Column({ type: "varchar", length: 255 })
    name_Person!: string;

    @Column({ type: "varchar", length: 255 })
    LastName_Person!: string;

    @Column({
        type: "enum",
        enum: Area,
    })
    Area_Person!: Area;

    @Column({ type: "varchar" })
    ProfilePicture_Person!: string;

    @Column({ type: "number" })
    id_user!: number;

}