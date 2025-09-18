import { LessonTypeEnum } from "@/domain/course/lesson/LessonTypeEnum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "lessons" })
export class LessonEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "varchar", length: 255 })
    description!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    type!: LessonTypeEnum;
}

