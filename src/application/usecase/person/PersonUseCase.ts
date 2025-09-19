import { Person } from '@/domain/person/Person';
import { PersonRepository } from '@/domain/person/ports/PersonRepository';
import { CreatePersonUseCase } from './cases/CreatePersonUseCase';
import { UserRepository } from '@/domain/user/ports/UserRepository';
import { UseCaseException } from '@/application/exception/UseCaseException';

export class PersonUseCase implements CreatePersonUseCase {

    constructor(
        private personRepository: PersonRepository,
        private userRepository: UserRepository
    ){}

    
    public async create(person: Omit<Person, 'id'>): Promise<Person> {
        const existingUser = await this.userRepository.findById(person.userId);

        if(!existingUser)
            throw new UseCaseException("User does not exists.")

        return await this.personRepository.createPerson(person);
    }

    

}