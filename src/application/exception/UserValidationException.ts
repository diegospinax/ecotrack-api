export class UseCaseValidationException extends Error{
    constructor(message:string){
        super(message);
    }
}