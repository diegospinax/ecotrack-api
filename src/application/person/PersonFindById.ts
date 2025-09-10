import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";

export class PersonFindById {
  constructor(private reposiroty: PersonRepository) {}

  async run(id: number): Promise<Person> {
    return this.reposiroty.findById(new PersonId(id));
  }
}
