import { Area } from "../../domain/person/Area";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { CourseEntity } from "./course/CourseEntity";
import { ChallengeEntity } from "./challenge/ChallengeEntity";
import { AchievementEntity } from "./achievement/AchievementEntity";

@Entity({ name: "persons" })
export class PersonEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255, name: "last_name" })
    lastName!: string;

    @Column({
        type: "varchar",
        length: 50
    })
    area!: Area;

    @Column({ type: "text", name: "profile_picture" })
    profilePicture!: string;

    @Column({ type: "boolean", name: "is_active" })
    isActive!: boolean;

    @OneToOne(() => UserEntity, (user) => user.person, { lazy: true })
    user?: Promise<UserEntity>;

    @OneToMany(() => CourseEntity, (courses) => courses.person, { lazy: true })
    courses?: Promise<CourseEntity[]>;

    @OneToMany(() => ChallengeEntity, (challenges) => challenges.person, { lazy: true })
    challenges?: Promise<ChallengeEntity[]>;

    @OneToMany(() => AchievementEntity, (achievements) => achievements.person, { lazy: true })
    achievements?: Promise<AchievementEntity[]>;
}