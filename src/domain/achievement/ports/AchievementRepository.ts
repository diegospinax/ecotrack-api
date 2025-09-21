import PersonId from "@/domain/person/value-objects/PersonId";
import { Achievement } from "../Achievement";
import BadgeId from "../badge/value-objects/BadgeId";

export interface AchievementRepository {
  create(achievement: Omit<Achievement, "id">): Promise<Achievement>;
  findByPersonIdAndBadgeId(personId: PersonId, badgeId: BadgeId): Promise<Achievement | null>;
  findAll(): Promise<Achievement[]>;
  findAllByPersonId(personId: PersonId): Promise<Achievement[]>;
  findAllByBadgeId(badgeId: BadgeId): Promise<Achievement[]>
}
