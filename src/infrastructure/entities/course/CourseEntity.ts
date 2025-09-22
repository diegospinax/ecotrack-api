import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./LessonEntity";
import { PersonEntity } from "../PersonEntity";

@Entity({ name: "courses" })
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => PersonEntity, (person) => person.courses)
    @JoinColumn({ name: "person_id" })
    person!: PersonEntity;

    @ManyToOne(() => LessonEntity, (lesson) => lesson.courses)
    @JoinColumn({ name: "lesson_id" })
    lesson!: LessonEntity;

    @Column({ type: "boolean", name: "is_finished" })
    isFinished!: boolean;
    
}


