import { Badge } from "@/domain/achievement/badge/Badge";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { BadgeEntity } from "@/infrastructure/entities/achievement/BadgeEntity";
import { mapEntityToBadgeDomain } from "@/infrastructure/mapper/out/badge-out-mapper";
import { Repository } from "typeorm";

export class BadgeRepositoryAdapter implements BadgeRepository {
    private badgeRepository: Repository<BadgeEntity>

    constructor() {
        this.badgeRepository = AppDataSource.getRepository(BadgeEntity);
    }

    public async create(badge: Omit<Badge, "id">): Promise<Badge> {
        const entity = this.badgeRepository.create({
            name: badge.name.value,
            description: badge.description.value,
            type: badge.type.value,
            isActive: badge.isActive.value
        });

        const savedBadge = await this.badgeRepository.save(entity);

        return mapEntityToBadgeDomain(savedBadge);
    }

    public async findAll(): Promise<Badge[]> {
        const badges = await this.badgeRepository.find({
            where: { isActive: true }
        });
        return badges.map(badge => mapEntityToBadgeDomain(badge));
    }

    public async findById(badgeId: BadgeId): Promise<Badge | null> {
        const existingBadge = await this.badgeRepository.findOneBy({
            id: badgeId.value,
        });

        return existingBadge ? mapEntityToBadgeDomain(existingBadge) : null;
    }

    public async findAllByType(badgeType: BadgeType): Promise<Badge[]> {
        const badges = await this.badgeRepository.find({
            where: {
                isActive: true,
                type: badgeType.value
            }
        });

        return badges.map(badge => mapEntityToBadgeDomain(badge));
    }

    public async update(badge: Badge): Promise<void> {
        const entity = this.badgeRepository.create({
            id: badge.id.value,
            name: badge.name.value,
            description: badge.description.value,
            type: badge.type.value,
            isActive: badge.isActive.value
        });

        await this.badgeRepository.save(entity);
    }

    public async delete(badgeId: BadgeId): Promise<void> {
        await this.badgeRepository
            .createQueryBuilder("badge")
            .update({ isActive: false })
            .where("id = :badgeId", { badgeId: badgeId.value })
            .execute();
    }
}