import CourseValidationException from "../exception/CourseValidationException";
import { CourseField } from "./abstract/CourseField";

export class CourseIsFinished extends CourseField<boolean> {
    constructor(value: boolean) {
        super(value);
    }
    public validate(): void {
        if (!this.value) {
            throw new CourseValidationException("Invalidate course status provided.");
        }
    }
}