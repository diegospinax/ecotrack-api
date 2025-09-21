import { BadgeTypeEnum } from "@/domain/achievement/badge/BadgeTypeEnum";

export class BadgeRequest {
    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly type: BadgeTypeEnum,
        public readonly isActive: boolean
    ) { }
}