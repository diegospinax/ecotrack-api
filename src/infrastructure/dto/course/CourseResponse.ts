import { LessonResponse } from "./lesson/LessonResponse";
import { PersonResponse } from "../person/PersonResponse";

export class CourseResponse {
  constructor(
    public readonly id: number,
    public readonly person: PersonResponse,
    public readonly lesson: LessonResponse,
    public readonly isFinished: boolean,
  ) {}
}
