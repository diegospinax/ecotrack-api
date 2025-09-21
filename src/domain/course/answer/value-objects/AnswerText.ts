import CourseValidationException from "../../exception/CourseValidationException";
import { AnswerField } from "./abstract/AnswerField";

export default class AnswerText extends AnswerField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    const regex: RegExp = /^[\w\sÁÉÍÓÚáéíóúÑñ¿¡.,;:!?\-()'"]+\.?$/u;
    if (!this.value || !regex.test(this.value)) {
      throw new CourseValidationException("Invalid answer provided.");
    }
  }
}
