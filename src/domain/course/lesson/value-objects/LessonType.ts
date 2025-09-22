import CourseValidationException from "../../exception/CourseValidationException";
import { LessonTypeEnum } from "../LessonTypeEnum";
import { LessonField } from "./abstract/LessonField";

export default class LessonType extends LessonField<LessonTypeEnum> {
  constructor(value: LessonTypeEnum) {
    super(value);
  }
  public validate(): void {
    const isValid = Object.values(LessonTypeEnum).includes(this.value as LessonTypeEnum);
    if (!isValid) {
      throw new CourseValidationException("Invalid lesson type provided.");
    }
  }
}
