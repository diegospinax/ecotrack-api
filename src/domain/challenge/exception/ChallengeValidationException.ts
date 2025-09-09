export default class ChallengeValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChallengeValidationException";

    Object.setPrototypeOf(this, ChallengeValidationException.prototype);
  }
}
