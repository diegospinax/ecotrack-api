import { Person } from "@/domain/person/Person";

export interface UpdatePersonUseCase {
    update(personPartial: Partial<Person>): Promise <void>;
}