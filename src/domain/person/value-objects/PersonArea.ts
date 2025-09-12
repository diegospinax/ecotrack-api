import { Area } from "../Area";
import PersonValidationException from "../exception/PersonValidationException";
import { PersonField } from "./abstract/PersonField";

export default class PersonArea extends PersonField<Area>{
    constructor(value:Area){
        super(value);
    }
    public validate(): void {
        if(!this.value){
            throw new PersonValidationException("Invalid person area provided.");
        }
    }
}
