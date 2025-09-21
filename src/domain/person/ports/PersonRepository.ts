import { User } from "@/domain/user/User";
import { Person } from "../Person";
import PersonId from "../value-objects/PersonId";

export interface PersonRepository {
  create(person: Omit<Person, 'id'>, user: Omit<User, "id">): Promise<Person>;
  findAll(): Promise<Person[]>;
  findById(personId: PersonId): Promise<Person | null>;
  update(person: Person): Promise<void>;
  delete(personId: PersonId): Promise<void>;
}
