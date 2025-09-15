import CourseValidationException from "../../exception/CourseValidationException";
import { AnswerField } from "./abstract/AnswerField";

export default class AnswerValidation extends AnswerField<boolean> {
  constructor(value: boolean) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new CourseValidationException("Invalid answere provided.");
    }
  }
}
