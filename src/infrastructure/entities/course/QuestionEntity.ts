import { number } from "joi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "questions" })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    question!: string;

    @Column({ type: "bigint", name: "lesson_id" })
    lessonId!: number;
}