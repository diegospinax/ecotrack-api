export default class AchievementValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AchievementValidationException";

    Object.setPrototypeOf(this, AchievementValidationException.prototype);
  }
}
