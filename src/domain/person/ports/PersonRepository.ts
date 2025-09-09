import { Person } from "../Person";
import PersonId from "../value-objects/PersonId";

export interface PersonRepository {
  createPerson(person: Person): Promise<Person>;
  findById(personId: PersonId): Promise<Person>;
  updatePerson(person: Person):  Promise<void>;
  deletePerson(person: Person):  Promise<void>;
}