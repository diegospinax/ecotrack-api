import { Person } from "@/domain/person/Person";
import { UpdatePersonDto } from "../dto/person/UpdatePersonDto";
import { CreatePersonDto } from "../dto/person/CreatePersonDto";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";
import { CreateUserDto } from "../dto/user/CreateUserDto";
import { User } from "@/domain/user/User";

export function updatePersonFieldsFromDto(personDto: UpdatePersonDto, existingPerson: Person): Person {
    return {
        id: existingPerson.id,
        name: personDto.name ?? existingPerson.name,
        lastName: personDto.lastName ?? existingPerson.lastName,
        area: personDto.area ?? existingPerson.area,
        profilePicture: personDto.profilePicture ?? existingPerson.profilePicture,
        isActive: personDto.isActive ?? existingPerson.isActive
    }
}

export function createPersonFromDto(personDto: CreatePersonDto): Omit<Person, "id"> {
    return {
        name: personDto.name,
        lastName: personDto.lastName,
        area: personDto.area,
        profilePicture: personDto.profilePicture,
        isActive: new PersonIsActive(true)
    }
}

export function createUserFromDto(userDto: CreateUserDto): Omit<User, "id"> {
    return {
        email: userDto.email,
        password: userDto.password,
        role: userDto.role
    }
}