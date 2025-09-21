import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./QuestionEntity";

@Entity({ name: "answers" })
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    answer!: string;

    @Column({ type: "boolean", name: "is_correct" })
    isCorrect!: boolean;

    @ManyToOne(() => QuestionEntity, (question) => question.answers, { lazy: true })
    question!: Promise<QuestionEntity>;
}






