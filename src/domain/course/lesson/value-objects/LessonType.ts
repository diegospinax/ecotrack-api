import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";
import CourseValidationException from "../../exception/CourseValidationException";
import { LessonField } from "./abstract/LessonField";

export default class LessonType extends LessonField<EcoCategoryEnum> {
  constructor(value: EcoCategoryEnum) {
    super(value);
  }
  public validate(): void {
    const isValid = Object.values(EcoCategoryEnum).includes(this.value as EcoCategoryEnum);
    if (!isValid) {
      throw new CourseValidationException("Invalid lesson type provided.");
    }
  }
}
