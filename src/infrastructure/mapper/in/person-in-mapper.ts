import { Person } from "@/domain/person/Person";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import UserEmail from "@/domain/user/value-objects/UserEmail";
import UserId from "@/domain/user/value-objects/UserId";
import UserPassword from "@/domain/user/value-objects/UserPassword";
import UserRole from "@/domain/user/value-objects/UserRole";
import { PersonRegister } from "@/infrastructure/dto/person/PersonRegister";
import { PersonRequest } from "@/infrastructure/dto/person/PersonRequest";
import { PersonResponse } from "@/infrastructure/dto/person/PersonResponse";

export const mapPersonDomainToResponse = (domain: Person): PersonResponse => {
    return {
        id: domain.id.value,
        name: domain.name.value,
        lastname: domain.lastName.value,
        area: domain.area.value,
        profilePicture: domain.profilePicture.value,
        isActive: domain.isActive.value
    }
}

export const mapPersonRegisterToDomain = (request: PersonRegister): Omit<Person, "id"> => {
    const { person, user } = request;
    return {
        name: new PersonName(person.name),
        lastName: new PersonLastName(person.lastname),
        area: new PersonArea(person.area),
        profilePicture: new PersonProfilePicture(person.profilePicture),
        isActive: new PersonIsActive(true),
        user: {
            email: new UserEmail(user.email),
            password: new UserPassword(user.password),
            role: new UserRole(user.role)
        }
    }
}

export const mapPersonRequestPartialToPartialDomain = (partialRequest: Partial<PersonRequest>, personId: PersonId): Partial<Person> => {
    return {
        id: personId,
        ...(partialRequest.name && {name: new PersonName(partialRequest.name)}),
        ...(partialRequest.lastname && {lastName: new PersonLastName(partialRequest.lastname)}),
        ...(partialRequest.area && {area: new PersonArea(partialRequest.area)}),
        ...(partialRequest.profilePicture && {profilePicture: new PersonProfilePicture(partialRequest.profilePicture)}),
        ...(partialRequest.isActive && {isActive: new PersonIsActive(partialRequest.isActive)})
    }
}