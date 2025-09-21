import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import BadgeDescription from "./value-objects/BadgeDescription";
import BadgeId from "./value-objects/BadgeId";
import BadgeName from "./value-objects/BadgeName";
import { Achievement } from "../Achievement";
import BadgeIsActive from "./value-objects/BadgeIsActive";

export interface Badge {
  id: BadgeId;
  name: BadgeName;
  description: BadgeDescription;
  type: BadgeType;
  isActive: BadgeIsActive;
  achievements?: Achievement[]
}
