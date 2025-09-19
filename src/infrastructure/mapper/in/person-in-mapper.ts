import { Person } from "@/domain/person/Person";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import UserId from "@/domain/user/value-objects/UserId";
import { PersonRequest } from "@/infrastructure/dto/person/PersonRequest";
import { PersonResponse } from "@/infrastructure/dto/person/PersonResponse";

export const mapPersonDomainToResponse = (domain: Person): PersonResponse => {
    return {
        id: domain.id.value,
        name: domain.name.value,
        lastname: domain.lastName.value,
        area: domain.area.value,
        profilePicture: domain.profilePicture.value,
        userId: domain.userId.value
    }
}

export const mapPersonRequestToDomain = (request: PersonRequest): Omit<Person, "id"> => {
    return {
        name: new PersonName(request.name),
        lastName: new PersonLastName(request.lastname),
        area: new PersonArea(request.area),
        profilePicture: new PersonProfilePicture(request.profilePicture),
        userId: new UserId(request.userId)
    }
}

export const mapPersonRequestPartialToPartialDomain = (partialRequest: Partial<PersonRequest>, personId: PersonId): Partial<Person> => {
    return {
        id: personId,
        ...(partialRequest.name && {name: new PersonName(partialRequest.name)}),
        ...(partialRequest.lastname && {lastName: new PersonLastName(partialRequest.lastname)}),
        ...(partialRequest.area && {area: new PersonArea(partialRequest.area)}),
        ...(partialRequest.profilePicture && {profilePicture: new PersonProfilePicture(partialRequest.profilePicture)}),
        ...(partialRequest.userId && {userId: new UserId(partialRequest.userId)})
    }
}