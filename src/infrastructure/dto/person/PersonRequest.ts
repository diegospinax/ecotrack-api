import { Area } from "@/domain/person/Area";

export class PersonRequest {
    constructor(
        public readonly name: string,
        public readonly lastname: string,
        public readonly area: Area,
        public readonly profilePicture: string,
        public readonly isActive: boolean
    ) { }
}