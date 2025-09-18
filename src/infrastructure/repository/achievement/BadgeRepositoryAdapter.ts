import { Badge } from "@/domain/achievement/badge/Badge";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeName from "@/domain/achievement/badge/value-objects/BadgeName";
import BadgeDescription from "@/domain/achievement/badge/value-objects/BadgeDescription";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";
import { Repository } from "typeorm";
import { BadgeEntity } from "@/infrastructure/entities/achievement/BadgeEntity";
import { AppDataSource } from "@/infrastructure/config/database.postgres";

export class BadgeRepositoryAdapter implements BadgeRepository {
    private badgeRepository: Repository<BadgeEntity>

    constructor() {
        this.badgeRepository = AppDataSource.getRepository(BadgeEntity);
    }

    async createBadge(badge: Badge): Promise<Badge> {
        try {
            const newBadge = await this.toEntity(badge);
            const savedBadge = await this.badgeRepository.save(newBadge);
            return this.toDomain(savedBadge);

        } catch (error) {

            console.error("Error creating badge: ", error);
            throw new Error("Error creating badge");
        }
    }


    async findById(badgeId: BadgeId): Promise<Badge> {
        try {
            const badge = await this.badgeRepository.findOne({
                where: { id_badge: badgeId.value },
            });

            if (!badge) {
                throw new Error("Badge not found");
            }

            return this.toDomain(badge);

        } catch (error) {

            console.error("Error fetching badge by id: ", error);
            throw new Error("Error fetching badge by id");

        }
    }


    async updateBadge(badge: Badge): Promise<void> {
        try {

            const badgeUpdate = await this.toEntity(badge);
            await this.badgeRepository.update(badgeUpdate.id_badge, badgeUpdate);

        } catch (error) {

            console.error("Error updating badge:", error);
            throw new Error("Error updating badge");
        }
    }


    async deleteBadge(badgeId: BadgeId): Promise<void> {
        try {
            const result = await this.badgeRepository.delete(badgeId.value);

            if (result.affected === 0) {
                throw new Error("Badge not found");
            }

        } catch (error) {

            console.error("Error deleting badge:", error);
            throw new Error("Error deleting badge");
        }
    }


    private toDomain(badge: BadgeEntity): Badge {
        return {
            id: new BadgeId(badge.id_badge),
            name: new BadgeName(badge.name_badge),
            description: new BadgeDescription(badge.description_badge),
            type: new BadgeType(badge.type_badge),
        };
    }

    private async toEntity(badge: Badge): Promise<BadgeEntity> {
        const badgeEntity = new BadgeEntity();
        badgeEntity.name_badge = badge.name.value;
        badgeEntity.description_badge = badge.description.value;
        badgeEntity.type_badge = badge.type.value;
        return badgeEntity;
    }
}