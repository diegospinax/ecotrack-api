import CourseValidationException from "../../exception/CourseValidationException";
import { QuestionField } from "./abstract/QuestionField";

export default class QuestionText extends QuestionField<string> {
  constructor(value: string) {
    super(value);
  }

  public validate(): void {
    if (this.value === null || this.value === undefined)
      throw new CourseValidationException("Invalid question text provided.");

    this.value = this.value.replace(/ /g, "_");
    this.value = this.value.toUpperCase();

    const regex: RegExp = /^[¿\p{Lu}0-9,:\-()."]+(?:_[,:\p{Lu}0-9?\-()."]+)*$/u;

    if (!regex.test(this.value)) {
      throw new CourseValidationException("Invalid question text provided.");
    }
  }
}
