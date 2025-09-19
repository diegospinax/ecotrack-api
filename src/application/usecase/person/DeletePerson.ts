import { PersonRepository } from "./../../domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";

export class DeletePerson {
  constructor(private repository: PersonRepository) {}

  async run(personId: PersonId): Promise<void> {
    await this.repository.deletePerson(personId);
  }
}
