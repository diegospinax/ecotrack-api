import ChallengeValidationException from "../exception/ChallengeValidationException";
import { ChallengeField } from "./abstract/ChallengeField";

export default class ChallengeTimesDone extends ChallengeField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.validate || this.value % 1 !== 0 || this.value < 0) {
      throw new ChallengeValidationException(
        "Invalid challenge time provided."
      );
    }
  }
}
