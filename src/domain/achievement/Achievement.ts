import type { Badge } from "../badge/Badge";
import type { Person } from "../person/Person";

export interface Achievement {
  id: number;
  person: Person;
  badge: Badge;
  dateReceived: Date;
}