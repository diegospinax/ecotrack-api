import { Achievement } from "@/domain/achievement/Achievement";
import PersonId from "@/domain/person/value-objects/PersonId";

export interface FindAchievementUseCase {
    findAll(): Promise<Achievement[]>;
    findAllByPersonId(personId: PersonId): Promise<Achievement[]>;
}