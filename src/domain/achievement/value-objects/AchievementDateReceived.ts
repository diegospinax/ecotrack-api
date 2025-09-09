import LogroValidationException from "../../exception/LogroValidationException";
import { AchievementField } from "../../abstract/AchievementField";

export default class AchievementDateReceived extends AchievementField<Date> {
  constructor(value: Date) {
    super(value);
  }

  public validate(): void {
    const now = new Date();
    if (!this.value || this.value.getTime() > now.getTime()) {
      throw new LogroValidationException("Invalid achievement date provided.");
    }
  }
}
