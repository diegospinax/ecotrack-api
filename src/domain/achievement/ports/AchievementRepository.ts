import PersonId from "@/domain/person/value-objects/PersonId";
import { Achievement } from "../Achievement";

export interface AchievementRepository {
  create(achievement: Omit<Achievement, "id">): Promise<Achievement>;
  findAll(): Promise<Achievement[]>;
  findAllByPersonId(personId: PersonId): Promise<Achievement[]>;
}
