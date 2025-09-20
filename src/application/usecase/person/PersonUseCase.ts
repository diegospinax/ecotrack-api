import { UseCaseException } from '@/application/exception/UseCaseException';
import { updatePersonFields } from '@/application/util/person-usecase-utils';
import { Person } from '@/domain/person/Person';
import { PersonRepository } from '@/domain/person/ports/PersonRepository';
import PersonId from '@/domain/person/value-objects/PersonId';
import { CreatePersonUseCase } from './cases/CreatePersonUseCase';
import { DeletePersonUseCase } from './cases/DeletePersonUseCase';
import { FindPersonUseCase } from './cases/FindPersonUseCase';
import { UpdatePersonUseCase } from './cases/UpdatePersonUseCase';

export class PersonUseCase implements CreatePersonUseCase, FindPersonUseCase, UpdatePersonUseCase, DeletePersonUseCase {

    constructor(
        private personRepository: PersonRepository
    ) { }

    public async create(person: Omit<Person, 'id'>): Promise<Person> {
        return await this.personRepository.createPerson(person);
    }

    public async findAll(): Promise<Person[]> {
        return await this.personRepository.findAll();
    }

    public async findById(personId: PersonId): Promise<Person> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson) 
            throw new UseCaseException("Person does not exists.")

        return existingPerson;
    }

    public async update(personPartial: Partial<Person>): Promise<void> {
        const existingPerson = await this.personRepository.findById(personPartial.id!);

        if (!existingPerson) throw new UseCaseException("Person does not exists.");

        const updatedPerson: Person = updatePersonFields(personPartial, existingPerson);

        return await this.personRepository.updatePerson(updatedPerson);
    }

    public async delete(personId: PersonId): Promise<void> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson) 
            throw new UseCaseException("Person does not exists.");

        return await this.personRepository.deletePerson(personId);
    }
}