import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";
import { mapPersonToDomain, mapPersonToEntity } from "@/infrastructure/mapper/person-mapper";
import { Repository } from "typeorm";

export class PersonRepositoryAdapter implements PersonRepository {
  private personRepository: Repository<PersonEntity>;

  constructor() {
    this.personRepository = AppDataSource.getRepository(PersonEntity);
  }

  async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
    const newPerson = mapPersonToEntity(person);
    const savedPerson = await this.personRepository.save(newPerson);
    return mapPersonToDomain(savedPerson);
  }

  async findById(personId: PersonId): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id: personId.value },
    });

    if (!person) {
      throw new Error("Person not found");
    }

    return mapPersonToDomain(person);
  }

  async updatePerson(person: Person): Promise<void> {
    const personUpdate = mapPersonToEntity(person);
    await this.personRepository.update(personUpdate.id, personUpdate);
  }

  async deletePerson(personId: PersonId): Promise<void> {
    await this.personRepository.query(`
        UPDATE users u
        SET is_active = $1
        FROM persons p
        WHERE p.id = $2
        AND u.id = p.user_id;
        `, [false, personId.value]);
  }
}
