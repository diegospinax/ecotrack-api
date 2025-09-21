import BadgeDescription from "@/domain/achievement/badge/value-objects/BadgeDescription";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeIsActive from "@/domain/achievement/badge/value-objects/BadgeIsActive";
import BadgeName from "@/domain/achievement/badge/value-objects/BadgeName";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";

export class UpdateBadgeDto {
    constructor(
        public readonly id: BadgeId,
        public readonly name?: BadgeName,
        public readonly description?: BadgeDescription,
        public readonly type?: BadgeType,
        public readonly isActive?: BadgeIsActive
    ) {}
}