import { Person } from "@/domain/person/Person";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import PersonId from "@/domain/person/value-objects/PersonId";
import { User } from "@/domain/user/User";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";
import { UserEntity } from "@/infrastructure/entities/UserEntity";
import { mapEntityToPersonDomain, mapPersonDomainToEntity } from "@/infrastructure/mapper/out/person-out-mapper";
import bcrypt from 'bcryptjs';
import { DataSource, Repository } from "typeorm";

export class PersonRepositoryAdapter implements PersonRepository {
  private personRepository: Repository<PersonEntity>;

  constructor(private datasource: DataSource) {
    this.personRepository = AppDataSource.getRepository(PersonEntity);
  }

  public async create(person: Omit<Person, 'id'>, user: Omit<User, "id">): Promise<Person> {
    return await this.datasource.transaction(async (entityManager) => {

      const personEntity = entityManager.create(PersonEntity, {
        name: person.name.value,
        lastName: person.lastName.value,
        area: person.area.value,
        profilePicture: person.profilePicture.value,
        isActive: person.isActive.value
      });

      const savedPerson = await entityManager.save(PersonEntity, personEntity);

      const userEntity = entityManager.create(UserEntity, {
        email: user.email.value,
        password: await bcrypt.hash(user.password.value, 10),
        role: user.role.value,
        person: savedPerson
      });

      await entityManager.save(UserEntity, userEntity);

      return mapEntityToPersonDomain(savedPerson);
    });
  }

  public async findAll(): Promise<Person[]> {
    const entities = await this.personRepository.createQueryBuilder("person")
      .where("person.isActive = :isActive", { isActive: true })
      .getMany();
      
    return entities.map(entity => mapEntityToPersonDomain(entity));
  }

  public async findById(personId: PersonId): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id: personId.value },
    });

    if (!person)
      throw new Error("Person not found");

    return mapEntityToPersonDomain(person);
  }

  public async update(person: Person): Promise<void> {
    const personUpdate = mapPersonDomainToEntity(person);
    await this.personRepository.save(personUpdate);
  }

  public async delete(personId: PersonId): Promise<void> {
    await this.personRepository
      .createQueryBuilder("person")
      .update({ isActive: false })
      .where("id = :personId", { personId: personId.value })
      .execute();
  }
}
