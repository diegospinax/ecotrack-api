export default class AchievementValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LogroValidationException";

    Object.setPrototypeOf(this, AchievementValidationException.prototype);
  }
}
