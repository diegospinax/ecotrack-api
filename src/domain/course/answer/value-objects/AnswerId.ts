import CourseValidationException from "../../exception/CourseValidationException";
import { AnswerField } from "./abstract/AnswerField";

export default class AnswerId extends AnswerField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (this.value === null || this.value === undefined || this.value % 1 !== 0) {
      throw new CourseValidationException("Invalid answer id provided.");
    }
  }
}
