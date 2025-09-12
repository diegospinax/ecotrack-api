import PersonId from "@/domain/person/value-objects/PersonId";
import AchievementId from "./value-objects/AchievementId";
import AchievementDateReceived from "./value-objects/AchievementDateReceived";
import BadgeId from "../badge/value-objects/BadgeId";

export interface Achievement {
  id: AchievementId;
  date: AchievementDateReceived;
  personId: PersonId;
  badgeId: BadgeId;
}
