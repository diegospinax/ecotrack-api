import { Achievement } from "@/domain/achievement/Achievement";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import PersonId from "@/domain/person/value-objects/PersonId";

export interface FindAchievementUseCase {
    findAll(): Promise<Achievement[]>;
    findAllByPersonId(personId: PersonId): Promise<Achievement[]>;
    findAllByBadgeId(badgeId: BadgeId): Promise<Achievement[]>;
}