import { Area } from "@/domain/person/Area";

export class PersonResponse {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly lastname: string,
        public readonly area: Area,
        public readonly profilePicture: string,
        public readonly userId: number 
    ){}
}