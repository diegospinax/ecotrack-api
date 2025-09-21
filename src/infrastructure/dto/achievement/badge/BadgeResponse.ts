import { BadgeTypeEnum } from "@/domain/achievement/badge/BadgeTypeEnum";

export class BadgeResponse {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly type: BadgeTypeEnum,
        public readonly isActive: boolean
    ) { }
}