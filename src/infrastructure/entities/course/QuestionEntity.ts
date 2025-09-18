import { number } from "joi";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "question" })
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id_question!: number;

    @Column({ type: "varchar", length: 255 })
    text_question!: string;

    @Column({ type: "number" })
    id_lesson!: number;
}