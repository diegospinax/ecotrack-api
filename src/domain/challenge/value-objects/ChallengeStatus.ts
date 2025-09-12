import ChallengeValidationException from "../exception/ChallengeValidationException";
import { ChallengeField } from "./abstract/ChallengeField";

export default class ChallengeStatus extends ChallengeField<boolean> {
  constructor(value: boolean) {
    super(value);
  }
  public validate(): void {
    if (!this.value) {
      throw new ChallengeValidationException(
        "Invalidate challemge status provided."
      );
    }
  }
}
