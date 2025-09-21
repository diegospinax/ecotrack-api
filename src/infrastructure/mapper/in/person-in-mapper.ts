import { CreatePersonDto } from "@/application/dto/person/CreatePersonDto";
import { Person } from "@/domain/person/Person";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import { PersonRegister } from "@/infrastructure/dto/person/PersonRegister";
import { PersonRequest } from "@/infrastructure/dto/person/PersonRequest";
import { PersonResponse } from "@/infrastructure/dto/person/PersonResponse";
import { mapUserRequestToCreateDto } from "./user-in-mapper";
import { UpdatePersonDto } from "@/application/dto/person/UpdatePersonDto";

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

export const mapPersonRegisterToCreateDto = (request: PersonRegister): CreatePersonDto => {
    const { person, user } = request;
    return {
        name: new PersonName(person.name),
        lastName: new PersonLastName(person.lastname),
        area: new PersonArea(person.area),
        profilePicture: new PersonProfilePicture(person.profilePicture),
        user: mapUserRequestToCreateDto(user)
    }
}

export const mapPersonRequestToUpdateDto = (request: Partial<PersonRequest>, personId: PersonId): UpdatePersonDto => {
    return {
        id: personId,
        ...(request.name && { name: new PersonName(request.name) }),
        ...(request.lastname && { lastName: new PersonLastName(request.lastname) }),
        ...(request.area && { area: new PersonArea(request.area) }),
        ...(request.profilePicture && { profilePicture: new PersonProfilePicture(request.profilePicture) }),
        ...(request.isActive && { isActive: new PersonIsActive(request.isActive) })
    }
}