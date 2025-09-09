import PersonValidationException from "../exception/PersonValidationException";
import { PersonField } from "./abstract/PersonField";

export default class PersonName extends PersonField<string>{
    constructor(value:string){
        super(value);
    }
    public validate(): void {
        const regex : RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:_[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;

        if(!this.value || !regex.test(this.value)){
            throw new PersonValidationException("Invalid Person name provide");
        }
    }
}