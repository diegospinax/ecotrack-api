import AchievementValidationException from "../exception/AchievementValidationException";
import { AchievementField } from "./abstract/AchievementField";


export default class AchievementId extends AchievementField<number> {
  constructor(value: number) {
    super(value);
  }
  public validate(): void {
    if (!this.validate || this.value % 1 !== 0) {
      throw new AchievementValidationException("Invalidate achivement id provided.");
    }
  }
}
