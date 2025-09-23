import { EcoCategoryEnum } from "@/domain/EcoCategoryEnum";


export class BadgeResponse {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly type: EcoCategoryEnum,
        public readonly isActive: boolean
    ) { }
}