import { Badge } from "@/domain/achievement/badge/Badge";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";

export class FindBadgeById {
  constructor(private repository: BadgeRepository) {}

  async run(badgeId: BadgeId): Promise<Badge> {
    return await this.repository.findById(badgeId);
  }
}
