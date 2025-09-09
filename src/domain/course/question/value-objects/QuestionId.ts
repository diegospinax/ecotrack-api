import CourseValidationException from "../../exception/CourseValidationException";
import { QuestionField } from "./abstract/QuestionFied";

export default class QuestionId extends QuestionField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.value || (this.value % 1 !== 0)) {
      throw new CourseValidationException("Invalidate question id provided.");
    }
  }
}
