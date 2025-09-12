import CourseValidationException from "../../exception/CourseValidationException";
import { Type } from "../Type";
import { LessonField } from "./abstract/LessonField";

export default class LessonType extends LessonField<Type> {
  constructor(value: Type) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new CourseValidationException("Invalid lesson type provided.");
    }
  }
}
