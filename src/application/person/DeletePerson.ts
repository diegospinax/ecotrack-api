import { PersonRepository } from "./../../domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";

export class DeletePerson {
  constructor(private repository: PersonRepository) {}

  async run(id: number): Promise<void> {
    await this.repository.deletePerson(new PersonId(id));
  }
}
