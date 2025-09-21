import CourseValidationException from "../../exception/CourseValidationException";
import { LessonTypeEnum } from "../LessonTypeEnum";
import { LessonField } from "./abstract/LessonField";

export default class LessonType extends LessonField<LessonTypeEnum> {
  constructor(value: LessonTypeEnum) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new CourseValidationException("Invalid lesson type provided.");
    }
  }
}
