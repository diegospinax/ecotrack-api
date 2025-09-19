import { Person } from "@/domain/person/Person";
import PersonId from "@/domain/person/value-objects/PersonId";
import UserId from "@/domain/user/value-objects/UserId";

export interface FindPersonUseCase {
    findById(personId: PersonId): Promise<Person | null>;
    findByUserId(userId: UserId): Promise<Person | null>;
}