import { Person } from "@/domain/person/Person";
import PersonArea from "@/domain/person/value-objects/PersonArea";
import PersonId from "@/domain/person/value-objects/PersonId";
import PersonIsActive from "@/domain/person/value-objects/PersonIsActive";
import PersonLastName from "@/domain/person/value-objects/PersonLastName";
import PersonName from "@/domain/person/value-objects/PersonName";
import PersonProfilePicture from "@/domain/person/value-objects/PersonProfilePicture";
import { PersonEntity } from "@/infrastructure/entities/PersonEntity";

export const mapEntityToPersonDomain = (entity: PersonEntity): Person => {
    return {
            id: new PersonId(entity.id),
            name: new PersonName(entity.name),
            lastName: new PersonLastName(entity.lastName),
            area: new PersonArea(entity.area),
            profilePicture: new PersonProfilePicture(entity.profilePicture),
            isActive: new PersonIsActive(entity.isActive)
        };
}

export const mapPersonDomainToEntity = (domain: Person): PersonEntity => {
    return {
        id: domain.id.value,
        name: domain.name.value,
        lastName: domain.lastName.value,
        area: domain.area.value,
        profilePicture: domain.profilePicture.value,
        isActive: domain.isActive.value,
    }
}