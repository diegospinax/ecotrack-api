import BadgeDescription from "@/domain/achievement/badge/value-objects/BadgeDescription";
import BadgeName from "@/domain/achievement/badge/value-objects/BadgeName";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";

export class CreateBadgeDto {
    constructor(
        public readonly name: BadgeName, 
        public readonly description: BadgeDescription,
        public readonly type: BadgeType
    ) {}
}