import { string } from "joi";
import { LessonField } from "./abstract/LessonField";
import CourseValidationException from "../../exception/CourseValidationException";

export default class LessonDescription extends LessonField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    const regex: RegExp = /^[\w\sÁÉÍÓÚáéíóúÑñ¿¡.,;:!?\-()'"]+\.?$/u;
    if (!this.value || !regex.test(this.value)) {
      throw new CourseValidationException(
        "Invalid lesson description provided."
      );
    }
  }
}
