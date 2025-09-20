import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";
import { UserEntity } from "@/infrastructure/entities/UserEntity";
import { mapEntityToPerson, mapPersonToEntity, mapPersonUpdateToEntity } from "@/infrastructure/mapper/out/person-out-mapper";
import bcrypt from 'bcryptjs';
import { DataSource, Repository } from "typeorm";

export class PersonRepositoryAdapter implements PersonRepository {
  private personRepository: Repository<PersonEntity>;

  constructor(private datasource: DataSource) {
    this.personRepository = AppDataSource.getRepository(PersonEntity);
  }

  public async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
    return await this.datasource.transaction(async (entityManager) => {
      const personEntity = mapPersonToEntity(person);
      const savedPerson = await entityManager.save(PersonEntity, personEntity);

      const userEntity = entityManager.create(UserEntity, {
        email: person.user?.email.value!,
        password: await bcrypt.hash(person.user?.password.value!, 10),
        role: person.user?.role.value!,
        person: savedPerson
      });

      await entityManager.save(UserEntity, userEntity);

      return mapEntityToPerson(savedPerson);
    });
  }

  public async findAll(): Promise<Person[]> {
    const entities = await this.personRepository.find();
    return entities.map(entity => mapEntityToPerson(entity));
  }

  public async findById(personId: PersonId): Promise<Person> {
    const person = await this.personRepository.findOneOrFail({
      where: { id: personId.value },
    });

    if (!person)
      throw new Error("Person not found");

    return mapEntityToPerson(person);
  }

  public async updatePerson(person: Person): Promise<void> {
    const personUpdate = mapPersonUpdateToEntity(person);
    await this.personRepository.save(personUpdate);
  }

  public async deletePerson(personId: PersonId): Promise<void> {
    await this.personRepository
      .createQueryBuilder("person")
      .update({ isActive: false })
      .where("id = :personId", { personId: personId.value })
      .execute();
  }
}
