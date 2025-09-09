import BadgeType from "@/domain/person/value-objects/BadgeType";
import BadgeDescription from "./value-objects/BadgeDescription";
import BadgeId from "./value-objects/BadgeId";
import BadgeName from "./value-objects/BadgeName";

export interface Badge {
  id: BadgeId;
  name: BadgeName;
  description: BadgeDescription;
  type: BadgeType;
}
