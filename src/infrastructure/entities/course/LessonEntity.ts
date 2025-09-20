import { LessonTypeEnum } from "../../../domain/course/lesson/LessonTypeEnum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./CourseEntity";
import { QuestionEntity } from "./QuestionEntity";

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

    @Column({ type: "boolean", name: "is_active" })
    isActive!: boolean;

    @OneToMany(() => QuestionEntity, (questions) => questions.lesson, { eager: true })
    questions!: QuestionEntity[];

    @OneToMany(() => CourseEntity, (courses) => courses.lesson)
    courses!: Promise<CourseEntity[]>;
}

