import { Person } from "@/domain/person/Person";

export function updatePersonFields(person: Partial<Person>, existingPerson: Person): Person {
    return {
        id: existingPerson.id,
        name: person.name ?? existingPerson.name,
        lastName: person.lastName ?? existingPerson.lastName,
        area: person.area ?? existingPerson.area,
        profilePicture: person.profilePicture ?? existingPerson.profilePicture,
        userId: person.userId ?? existingPerson.userId
    }
}