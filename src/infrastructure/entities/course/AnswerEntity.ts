import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "answers" })
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    answer!: string;

    @Column({ type: "boolean", name: "is_correct" })
    isCorrect!: boolean;

    @Column({ type: "number", name: "question_id" })
    questionId!: number;
}






