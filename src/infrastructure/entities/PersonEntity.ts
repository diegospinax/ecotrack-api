import { Area } from "../../domain/person/Area";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "persons" })
export class PersonEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255, name: "last_name" })
    lastName!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    area!: Area;

    @Column({ type: "text", name: "profile_picture" })
    profilePicture!: string;

    @Column({ type: "bigint", name: "user_id" })
    userId!: number;

}