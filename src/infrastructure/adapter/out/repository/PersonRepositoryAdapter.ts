import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";
import UserId from "@/domain/user/value-objects/UserId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";
import { mapEntityToPerson, mapPersonToEntity, mapPersonUpdateToEntity } from "@/infrastructure/mapper/out/person-out-mapper";
import { Repository } from "typeorm";

export class PersonRepositoryAdapter implements PersonRepository {
  private personRepository: Repository<PersonEntity>;

  constructor() {
    this.personRepository = AppDataSource.getRepository(PersonEntity);
  }

  public async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
    const newPerson = mapPersonToEntity(person);
    const savedPerson = await this.personRepository.save(newPerson);
    return mapEntityToPerson(savedPerson);
  }

  public async list(): Promise<Person[]> {
    const entities = await this.personRepository.find();
    return entities.map(entity => mapEntityToPerson(entity));
  }

  public async findById(personId: PersonId): Promise<Person> {
    const person = await this.personRepository.findOneOrFail({
      where: { id: personId.value },
    });

    if (!person) {
      throw new Error("Person not found");
    }

    return mapEntityToPerson(person);
  }

  public async findByUserId(userId: UserId): Promise<Person> {
    const entity = await this.personRepository.findOneOrFail({
      where: { userId: userId.value }
    });

    return mapEntityToPerson(entity);
  }

  public async updatePerson(person: Person): Promise<void> {
    const personUpdate = mapPersonUpdateToEntity(person);
    await this.personRepository.save(personUpdate);
  }

  public async deletePerson(personId: PersonId): Promise<void> {
    await this.personRepository.query(`
        UPDATE users u
        SET is_active = $1
        FROM persons p
        WHERE p.id = $2
        AND u.id = p.user_id;
        `, [false, personId.value]);
  }
}
