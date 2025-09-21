import { CreatePersonDto } from "@/application/dto/person/CreatePersonDto";
import { Person } from "@/domain/person/Person";

export interface CreatePersonUseCase {
    create(person: CreatePersonDto): Promise<Person>;
}