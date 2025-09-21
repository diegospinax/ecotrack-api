import CourseValidationException from "../../exception/CourseValidationException";
import { LessonField } from "./abstract/LessonField";

export default class LessonIsActive extends LessonField<boolean> {
    constructor(value: boolean) {
        super(value);
    }

    public validate(): void {
        if (this.value === null || this.value === undefined) {
            throw new CourseValidationException("Invalid lesson active status provided.");
        }
    }
}