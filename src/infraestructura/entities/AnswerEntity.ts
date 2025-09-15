import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "answer" })
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id_answer!: number;

    @Column({ type: "varchar", length: 255 })
    text_answer!: string;

    @Column({ type: "boolean" })
    validation_answer!: boolean;

    @Column({ type: "number" })
    id_question!: number;
}






