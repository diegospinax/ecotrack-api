import { Person } from "@/domain/person/Person";

export interface CreatePersonUseCase {
    create(person: Omit<Person, "id">): Promise<Person>;
}