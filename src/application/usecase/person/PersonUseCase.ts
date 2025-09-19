import { Person } from '@/domain/person/Person';
import { PersonRepository } from '@/domain/person/ports/PersonRepository';
import { CreatePersonUseCase } from './cases/CreatePersonUseCase';
import { UserRepository } from '@/domain/user/ports/UserRepository';
import { UseCaseException } from '@/application/exception/UseCaseException';
import { FindPersonUseCase } from './cases/FindPersonUseCase';
import PersonId from '@/domain/person/value-objects/PersonId';
import UserId from '@/domain/user/value-objects/UserId';
import { UpdatePersonUseCase } from './cases/UpdatePersonUseCase';
import { updatePersonFields } from '@/application/util/person-usecase-utils';
import { DeletePersonUseCase } from './cases/DeletePersonUseCase';

export class PersonUseCase implements CreatePersonUseCase, FindPersonUseCase, UpdatePersonUseCase, DeletePersonUseCase {

    constructor(
        private personRepository: PersonRepository,
        private userRepository: UserRepository
    ) { }

    public async create(person: Omit<Person, 'id'>): Promise<Person> {
        await this.validateUserAssign(person.userId);
        return await this.personRepository.createPerson(person);
    }

    public async list(): Promise<Person[]> {
        return await this.personRepository.list();
    }

    public async findById(personId: PersonId): Promise<Person> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson) 
            throw new UseCaseException("Person does not exists.")

        return existingPerson;
    }

    public async findByUserId(userId: UserId): Promise<Person> {
        const existingPerson = await this.personRepository.findByUserId(userId);

        if (!existingPerson) 
            throw new UseCaseException("Person does not exists.")

        return existingPerson;
    }

    public async update(personPartial: Partial<Person>): Promise<void> {
        const existingPerson = await this.personRepository.findById(personPartial.id!);

        if (!existingPerson) throw new UseCaseException("Person does not exists.");

        if (personPartial.userId && personPartial.userId.value !== existingPerson.userId.value)
            await this.validateUserAssign(personPartial.userId);

        const updatedPerson: Person = updatePersonFields(personPartial, existingPerson);

        return await this.personRepository.updatePerson(updatedPerson);
    }

    public async delete(personId: PersonId): Promise<void> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson) 
            throw new UseCaseException("Person does not exists.");

        return await this.personRepository.deletePerson(personId);
    }

    private async validateUserAssign(userId: UserId) {
        await this.validateExistingUser(userId);
        await this.validateUserAvailable(userId);
    }

    private async validateExistingUser(userId: UserId) {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser)
            throw new UseCaseException(`User with id: ${userId.value}, does not exists.`);
    }

    private async validateUserAvailable(userId: UserId) {
        const personWithUser = await this.personRepository.findByUserId(userId);
        if (personWithUser)
            throw new UseCaseException("User already in use.");
    }
}