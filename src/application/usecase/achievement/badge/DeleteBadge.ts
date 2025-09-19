import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";

export class DeleteBadge {
  constructor(private repository: BadgeRepository) {}

  async run(badgeId: BadgeId): Promise<void> {
    return await this.repository.deleteBadge(badgeId);
  }
}
