export default class UserValidationException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "UserValidationException";
    
    Object.setPrototypeOf(this, UserValidationException.prototype);
  }
}
