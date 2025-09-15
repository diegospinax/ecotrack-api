import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "course" })
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id_course!: number;

    @Column({ type: "number" })
    id_Person!: number;

    @Column({ type: "number" })
    id_lesson!: number;

    @Column({ type: "boolean" })
    status_course!: boolean;
}

