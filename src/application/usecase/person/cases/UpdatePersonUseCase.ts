import { UpdatePersonDto } from "@/application/dto/person/UpdatePersonDto";

export interface UpdatePersonUseCase {
    update(personDto: UpdatePersonDto): Promise <void>;
}