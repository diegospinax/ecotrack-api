import PersonValidationException from "../exception/PersonValidationException";
import { PersonField } from "./abstract/PersonField";

export default class PersonProfilePicture extends PersonField<string>{
    constructor(value:string){
        super(value);
    }
    public validate(): void {
        if(this.value === null || this.value === undefined || this.value.trim() === ""){
            throw new PersonValidationException("Invalid profile picture provided.")
        }
    }
}