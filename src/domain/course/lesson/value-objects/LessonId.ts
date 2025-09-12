import CourseValidationException from "../../exception/CourseValidationException";
import { LessonField } from "./abstract/LessonField";

export default class LessonId extends LessonField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.value || this.value % 1 !== 0) {
      throw new CourseValidationException("Invalid id lesson provided.");
    }
  }
}
