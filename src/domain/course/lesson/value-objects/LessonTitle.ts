import CourseValidationException from "../../exception/CourseValidationException";
import { LessonField } from "./abstract/LessonField"

export default class LessonTitle extends LessonField<string>{
    constructor(value:string){
        super(value);
    }
    public validate(): void {
     const regex : RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?:[ ,\.\-:()]*[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+)*$/;
        if(!this.value || !regex.test(this.value)){
            throw new CourseValidationException("Invalid lesson title provided.")
        }
    }
}