import CourseValidationException from "../../exception/CourseValidationException";
import { AnswerField } from "./abstract/AnswerField";

export default class AnswerIsCorrect extends AnswerField<boolean> {
  constructor(value: boolean) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new CourseValidationException("Invalid answer is correct property provided.");
    }
  }
}
