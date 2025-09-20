import UserId from "@/domain/user/value-objects/UserId";
import { Person } from "../Person";
import PersonId from "../value-objects/PersonId";

export interface PersonRepository {
  createPerson(person: Omit<Person, 'id'>): Promise<Person>;
  findAll(): Promise<Person[]>;
  findById(personId: PersonId): Promise<Person | null>;
  updatePerson(person: Person): Promise<void>;
  deletePerson(personId: PersonId): Promise<void>;
}
