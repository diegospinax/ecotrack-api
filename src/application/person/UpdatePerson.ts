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

  async run(
    id: number,
    name: string,
    lastName: string,
    area: Area,
    profilePicture: string,
    userId: number
  ): Promise<void> {
    const person: Person = {
      id: new PersonId(id),
      name: new PersonName(name),
      lastName: new PersonLastName(lastName),
      area: new PersonArea(area),
      profilePicture: new PersonProfilePicture(profilePicture),
      userId: new UserId(userId),
    };
    return this.repository.updatePerson(person);
  }
}
