import ChallengeValidationException from "../exception/ChallengeValidationException";
import { ChallengeField } from "./abstract/ChallengeField";

export default class ChallengeIsFinished extends ChallengeField<boolean> {
  constructor(value: boolean) {
    super(value);
  }
  public validate(): void {
    if (this.value === null || this.value === undefined) {
      throw new ChallengeValidationException(
        "Invalid challenge finished status provided."
      );
    }
  }
}
