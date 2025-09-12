import { Badge } from "@/domain/achievement/badge/Badge";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";

export class UpdateBadge {
  constructor(private repository: BadgeRepository) {}

  async run(badge: Badge): Promise<void> {
    return await this.repository.updateBadge(badge);
  }
}
