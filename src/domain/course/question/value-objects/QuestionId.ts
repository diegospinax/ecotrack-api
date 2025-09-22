import CourseValidationException from "../../exception/CourseValidationException";
import { QuestionField } from "./abstract/QuestionField";

export default class QuestionId extends QuestionField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (this.value === null || this.value === undefined || (this.value % 1 !== 0)) {
      throw new CourseValidationException("Invalidate question id provided.");
    }
  }
}
