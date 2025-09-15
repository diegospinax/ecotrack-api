import CourseValidationException from "../../exception/CourseValidationException";
import { QuestionField } from "./abstract/QuestionField";

export default class QuestionText extends QuestionField<string> {
  constructor(value: string) {
    super(value);
  }
  public validate(): void {
    const regex: RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,;:()¿¡'"\- ]{5,200}\?$ /;
    if (!this.value || !regex.test(this.value)) {
      throw new CourseValidationException("Invalid Question provided.");
    }
  }
}
