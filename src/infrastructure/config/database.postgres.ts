import { DataSource } from "typeorm";
import environmentVars from "./environment.vars";
import { UserEntity } from "../entities/UserEntity";
import { PersonEntity } from "../entities/PersonEntity";
import { TaskEntity } from "../entities/TaskEntity";
import { QuestionEntity } from "../entities/QuestionEntity";
import { LessonEntity } from "../entities/LessonEntity";
import { CourseEntity } from "../entities/CourseEntity";
import { ChallengeEntity } from "../entities/ChallengeEntity";
import { BadgeEntity } from "../entities/BadgeEntity";
import { AnswerEntity } from "../entities/AnswerEntity";
import { AchievementEntity } from "../entities/AchievementEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: environmentVars.DB_HOST,
  port: Number(environmentVars.DB_PORT),
  username: environmentVars.DB_USER,
  password: environmentVars.DB_PASSWORD,
  database: environmentVars.DB_NAME,
  schema: environmentVars.DB_SCHEMA,
  synchronize: true,
  entities: [UserEntity, PersonEntity, TaskEntity, QuestionEntity, LessonEntity, CourseEntity, ChallengeEntity, BadgeEntity, AnswerEntity, AchievementEntity]
});

export const postgresConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Succesfully connected database.");
  } catch (e) {
    console.error("Cannot connect to postgres database: ", e);
    process.exit(1);
  }
}