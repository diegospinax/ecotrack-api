import ChallengeValidationException from "../exception/ChallengeValidationException";
import { ChallengeField } from "./abstract/ChallengeField";

export default class ChallengeId extends ChallengeField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.value || this.value % 1 !== 0) {
      throw new ChallengeValidationException(
        "Invalidate challenge id provided."
      );
    }
  }
}
