import { describe, it, expect } from "vitest";
import BadgeId from "../../../../domain/achievement/badge/value-objects/BadgeId";
import BadgeName from "../../../../domain/achievement/badge/value-objects/BadgeName";
import BadgeDescription from "../../../../domain/achievement/badge/value-objects/BadgeDescription";
import BadgeType from "../../../../domain/achievement/badge/value-objects/BadgeType";
import BadgeIsActive from "../../../../domain/achievement/badge/value-objects/BadgeIsActive";
import { EcoCategoryEnum } from "../../../../domain/EcoCategoryEnum";
import { Badge } from "../../../../domain/achievement/badge/Badge";

describe("Badge", () => {
  it("should create a valid badge", () => {
    const badge: Badge = {
      id: new BadgeId(1),
      name: new BadgeName("BADGE_NAME"),
      description: new BadgeDescription("This is, a valid description."),
      type: new BadgeType(EcoCategoryEnum.CARBON_FOOTPRINT),
      isActive: new BadgeIsActive(true),
    };

    expect(badge.id.value).toBe(1);
    expect(badge.name.value).toBe("BADGE_NAME");
    expect(badge.description.value).toBe("THIS_IS,_A_VALID_DESCRIPTION.");
    expect(badge.type.value).toBe(EcoCategoryEnum.CARBON_FOOTPRINT);
    expect(badge.isActive.value).toBe(true);
  });
});
