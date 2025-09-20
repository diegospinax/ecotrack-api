import AchievementValidationException from "../../exception/AchievementValidationException";
import { BadgeField } from "./abstract/BadgeField";

export default class BadgeIsActive extends BadgeField<boolean> {
    constructor(value: boolean) {
        super(value);
    }

    public validate(): void {
        if (this.value === null || this.value === undefined) {
            throw new AchievementValidationException("Invalid badge active status provided.");
        }
    }
}