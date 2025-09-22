import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./LessonEntity";
import { AnswerEntity } from "./AnswerEntity";

@Entity({ name: "questions" })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    question!: string;

    @ManyToOne(() => LessonEntity, (lesson) => lesson.questions)
    @JoinColumn({ name: "lesson_id" })
    lesson?: LessonEntity;

    @OneToMany(() => AnswerEntity, (answers) => answers.question, { cascade: true })
    answers?: AnswerEntity[];
} 