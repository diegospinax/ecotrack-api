import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import { Repository } from "typeorm";
import { PersonEntity } from "../entities/PersonEntity";
import { AppDataSource } from "../config/database.postgres";
import { Person } from "@/domain/person/Person";
import PersonId from "@/domain/person/value-objects/PersonId";
import UserId from "@/domain/user/value-objects/UserId";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";

export class UserRepositoryAdpter implements PersonRepository {
    private personRepository: Repository<PersonEntity>

    constructor() {
        this.personRepository = AppDataSource.getRepository(PersonEntity);
    }

    async createPerson(person: Person): Promise<Person> {
        try {
            const newPerson = await this.toEntity(person);
            const savedPerson = await this.personRepository.save(newPerson);
            return this.toDomain(savedPerson);;

        } catch (error) {

            console.error("Error creating person ", error);
            throw new Error("Error creating person");
        }
    }

    async findById(personId: PersonId): Promise<Person> {
        try {
            const person = await this.personRepository.findOne({
                where: { id_Person: personId.value },
            });

            if (!person) {
                throw new Error("Person not found");
            }

            return this.toDomain(person);

        } catch (error) {

            console.error("Error fetching person by id: ", error);
            throw new Error("Error fetching person by id");

        }
    }

    async updatePerson(person: Person): Promise<void> {
        try {

            const personUpdate = await this.toEntity(person);
            await this.personRepository.update(personUpdate.id_Person, personUpdate);

        } catch (error) {

            console.error("Error updating person:", error);
            throw new Error("Error updating person");
        }
    }

    async deletePerson(personId: PersonId): Promise<void> {
        try {
            const result = await this.personRepository.delete(personId.value);

            if (result.affected === 0) {
                throw new Error("Person not found");
            }
            
        } catch (error) {

            console.error("Error deleting person:", error);
            throw new Error("Error deleting person");
        }
    }


    private toDomain(person: PersonEntity): Person {
        return {
            id: new PersonId(person.id_Person),
            name: new PersonName(person.name_Person),
            lastName: new PersonLastName(person.LastName_Person),
            area: new PersonArea(person.Area_Person),
            profilePicture: new PersonProfilePicture(person.ProfilePicture_Person),
            userId: new UserId(person.id_user)
        };
    }

    private async toEntity(person: Person): Promise<PersonEntity> {
        const personEntity = new PersonEntity();
        personEntity.name_Person = person.name.value;
        personEntity.LastName_Person = person.lastName.value;
        personEntity.Area_Person = person.area.value;
        personEntity.ProfilePicture_Person = person.profilePicture.value;
        personEntity.id_user = person.userId.value;
        return personEntity;
    }


}