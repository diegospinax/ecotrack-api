import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./LessonEntity";
import { PersonEntity } from "../PersonEntity";

@Entity({ name: "courses" })
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => PersonEntity, (person) => person.courses, { eager: true })
    person!: PersonEntity;

    @ManyToOne(() => LessonEntity, (lesson) => lesson.courses, { eager: true })
    lesson!: LessonEntity;

    @Column({ type: "boolean", name: "is_finished" })
    isFinished!: boolean;
    
}


