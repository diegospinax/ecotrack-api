import PersonValidationException from "../exception/PersonValidationException";
import { PersonField } from "./abstract/PersonField";

export default class PersonProfilePicture extends PersonField<string>{
    constructor(value:string){
        super(value);
    }
    public validate(): void {
        if(!this.value){
            throw new PersonValidationException("Invalid porfile picture provided.")
        }
    }
}