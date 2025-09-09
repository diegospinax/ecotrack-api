export default class CourseValidationException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "CourseValidationException";
    
    Object.setPrototypeOf(this, CourseValidationException.prototype);
  }
}