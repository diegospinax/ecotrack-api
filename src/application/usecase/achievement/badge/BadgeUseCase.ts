import { CreateBadgeDto } from "@/application/dto/achievement/badge/CreateBadgeDto";
import { UpdateBadgeDto } from "@/application/dto/achievement/badge/UpdateBadgeDto";
import { UseCaseException } from "@/application/exception/UseCaseException";
import { createBadgeFromDto, updateBadgeFieldsFromDto } from "@/application/util/badge-usecase-util";
import { Badge } from "@/domain/achievement/badge/Badge";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import BadgeType from "@/domain/achievement/badge/value-objects/BadgeType";
import { CreateBadgeUseCase } from "./cases/CreateBadgeUseCase";
import { DeleteBadgeUseCase } from "./cases/DeleteBadgeUseCase";
import { FindBadgeUseCase } from "./cases/FindBadgeUseCase";
import { UpdateBadgeUseCase } from "./cases/UpdateBadgeUseCase";

export class BadgeUseCase implements CreateBadgeUseCase, FindBadgeUseCase, UpdateBadgeUseCase, DeleteBadgeUseCase {
    constructor(private badgeRepository: BadgeRepository){}

    public async create(badgeDto: CreateBadgeDto): Promise<Badge> {
        const badge: Omit<Badge, "id"> = createBadgeFromDto(badgeDto);

        return await this.badgeRepository.create(badge);
    }

     public async findAll(): Promise<Badge[]> {
        return await this.badgeRepository.findAll();
    }

    public async findById(badgeId: BadgeId): Promise<Badge> {
        const existingBadge: Badge = await this.validateExistingBadge(badgeId);

        return existingBadge;
    }

    public async findAllByType(badgeType: BadgeType): Promise<Badge[]> {
        return await this.badgeRepository.findAllByType(badgeType);
    }

    public async update(badgeDto: UpdateBadgeDto): Promise<void> {
        const existingBadge: Badge = await this.validateExistingBadge(badgeDto.id);
        
        const badge: Badge = updateBadgeFieldsFromDto(badgeDto, existingBadge);

        await this.badgeRepository.update(badge);
    }

    public async delete(badgeId: BadgeId): Promise<void> {
        const existingBadge: Badge = await this.validateExistingBadge(badgeId);

        await this.badgeRepository.delete(existingBadge.id);
    }

    private async validateExistingBadge(badgeId: BadgeId): Promise<Badge> {
        const existingBadge = await this.badgeRepository.findById(badgeId);

        if (!existingBadge)
            throw new UseCaseException(`Badge not found for id: ${badgeId.value}`)

        return existingBadge;
    }
}