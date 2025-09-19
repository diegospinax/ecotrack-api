import { Badge } from "@/domain/achievement/badge/Badge";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";

export class createBadge {
  constructor(private repository: BadgeRepository) {}

  async run(badge: Badge): Promise<Badge> {
    return await this.repository.createBadge(badge);
  }
}
