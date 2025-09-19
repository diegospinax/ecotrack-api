import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "courses" })
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "bigint", name: "person_id" })
    personId!: number;

    @Column({ type: "bigint", name: "lesson_id" })
    lessonId!: number;

    @Column({ type: "boolean", name: "is_finished" })
    isFinished!: boolean;
}

