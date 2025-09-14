import { Area } from "@/domain/person/Area";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
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
    @Column({ type: "boolean" })
    ProfilePicture_Person!: boolean;
    @Column({ type: "number" })
    id_user!: number;

}