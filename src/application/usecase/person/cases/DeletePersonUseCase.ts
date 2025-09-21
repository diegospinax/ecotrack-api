import PersonId from "@/domain/person/value-objects/PersonId";

export interface DeletePersonUseCase {
    delete(personId: PersonId): Promise<void>;
}