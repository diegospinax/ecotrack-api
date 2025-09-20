import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./LessonEntity";
import { AnswerEntity } from "./AnswerEntity";

@Entity({ name: "questions" })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    question!: string;

    @ManyToOne(() => LessonEntity, (lesson) => lesson.questions)
    lesson!: Promise<LessonEntity>;

    @OneToMany(() => AnswerEntity, (answers) => answers.question, { eager: true })
    answers!: AnswerEntity[];
} 