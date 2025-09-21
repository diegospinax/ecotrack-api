import { Person } from "../person/Person";
import { Badge } from "./badge/Badge";
import AchievementDateReceived from "./value-objects/AchievementDateReceived";
import AchievementId from "./value-objects/AchievementId";

export interface Achievement {
  id: AchievementId;
  dateReceived: AchievementDateReceived;
  person: Person;
  badge: Badge;
}
