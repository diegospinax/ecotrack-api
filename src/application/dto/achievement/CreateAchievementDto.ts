import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import PersonId from "@/domain/person/value-objects/PersonId";

export class CreateAchievementDto {
    constructor(
        public readonly personId: PersonId,
        public readonly badgeId: BadgeId
    ) {}
}