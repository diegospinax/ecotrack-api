import CourseValidationException from "../exception/CourseValidationException";
import { CourseField } from "./abstract/CourseField";

export class CourseId extends CourseField<number> {
    constructor(value: number) {
        super(value);
    }
    public validate(): void {
        if (!this.value || (this.value % 1 !== 0)) {
            throw new CourseValidationException("Invalidate course id provided.");
        }
    }
}