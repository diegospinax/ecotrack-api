import { CreatePersonDto } from '@/application/dto/person/CreatePersonDto';
import { UpdatePersonDto } from '@/application/dto/person/UpdatePersonDto';
import { UseCaseException } from '@/application/exception/UseCaseException';
import { createPersonFromDto, createUserFromDto, updatePersonFieldsFromDto } from '@/application/util/person-usecase-util';
import { Person } from '@/domain/person/Person';
import { PersonRepository } from '@/domain/person/ports/PersonRepository';
import PersonId from '@/domain/person/value-objects/PersonId';
import { User } from '@/domain/user/User';
import { CreatePersonUseCase } from './cases/CreatePersonUseCase';
import { DeletePersonUseCase } from './cases/DeletePersonUseCase';
import { FindPersonUseCase } from './cases/FindPersonUseCase';
import { UpdatePersonUseCase } from './cases/UpdatePersonUseCase';

export class PersonUseCase implements CreatePersonUseCase, FindPersonUseCase, UpdatePersonUseCase, DeletePersonUseCase {

    constructor(
        private personRepository: PersonRepository
    ) { }

    public async create(personDto: CreatePersonDto): Promise<Person> {
        const person: Omit<Person, "id"> = createPersonFromDto(personDto);

        const user: Omit<User, "id"> = createUserFromDto(personDto.user);
        
        return await this.personRepository.create(person, user);
    }

    public async findAll(): Promise<Person[]> {
        return await this.personRepository.findAll();
    }

    public async findById(personId: PersonId): Promise<Person> {
        const existingPerson = await this.validateExistingPerson(personId);

        return existingPerson;
    }

    public async update(personDto: UpdatePersonDto): Promise<void> {
        const existingPerson = await this.validateExistingPerson(personDto.id);

        const updatedPerson: Person = updatePersonFieldsFromDto(personDto, existingPerson);

        await this.personRepository.update(updatedPerson);
    }

    public async delete(personId: PersonId): Promise<void> {
        const existingPerson = await this.validateExistingPerson(personId);

        await this.personRepository.delete(existingPerson.id);
    }

    private async validateExistingPerson(personId: PersonId): Promise<Person> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson)
            throw new UseCaseException(`Person not found for id: ${personId.value}`);

        return existingPerson;
    }
}