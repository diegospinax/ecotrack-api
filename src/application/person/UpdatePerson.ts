import { Area } from "@/domain/person/Area";
import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import UserId from "@/domain/user/value-objects/UserId";

export class UpdatePerson {
  constructor(private repository: PersonRepository) {}

  async run(person: Person): Promise<void> {
    return await this.repository.updatePerson(person);
  }
}
