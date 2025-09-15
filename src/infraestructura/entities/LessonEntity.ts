import { Type } from "@/domain/course/lesson/Type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lesson" })
export class LessonEntity {
    @PrimaryGeneratedColumn()
    id_lesson!: number;

    @Column({ type: "varchar", length: 255 })
    title_lesson!: string;

    @Column({ type: "varchar", length: 255 })
    description_lesson!: string;

    @Column({
        type: "enum",
        enum: Type
    })
    type_lesson!: Type;
}

