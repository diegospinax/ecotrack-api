import { Achievement } from "@/domain/achievement/Achievement";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";
import PersonId from "@/domain/person/value-objects/PersonId";
import { AppDataSource } from "@/infrastructure/config/database.postgres";
import { AchievementEntity } from "@/infrastructure/entities/achievement/AchievementEntity";
import { mapEntityToAchievementDomain } from "@/infrastructure/mapper/out/achievement-out-mapper";
import { mapBadgeDomainToEntity } from "@/infrastructure/mapper/out/badge-out-mapper";
import { mapPersonDomainToEntity } from "@/infrastructure/mapper/out/person-out-mapper";
import { Repository } from "typeorm";

export class AchievementRepositoryAdapter implements AchievementRepository {
    private achievementRepository: Repository<AchievementEntity>

    constructor() {
        this.achievementRepository = AppDataSource.getRepository(AchievementEntity);
    }

    public async create(achievement: Omit<Achievement, "id">): Promise<Achievement> {
        const entity: AchievementEntity = this.achievementRepository.create({
            person: mapPersonDomainToEntity(achievement.person),
            badge: mapBadgeDomainToEntity(achievement.badge),
            dateReceived: achievement.dateReceived.value
        });

        const savedAchievement = await this.achievementRepository.save(entity);

        return mapEntityToAchievementDomain(savedAchievement);
    }

    public async findAll(): Promise<Achievement[]> {
        const achievements = await this.achievementRepository.createQueryBuilder("achievement")
            .leftJoinAndSelect("achievement.person", "person")
            .leftJoinAndSelect("achievement.badge", "badge")
            .where("badge.isActive = :badgeActive")
            .andWhere("person.isActive = :personActive")
            .setParameters({ badgeActive: true, personActive: true })
            .getMany();

        return achievements.map(achievement => mapEntityToAchievementDomain(achievement));
    }

    public async findByPersonIdAndBadgeId(personId: PersonId, badgeId: BadgeId): Promise<Achievement | null> {
        const achievement = await this.achievementRepository.createQueryBuilder("achievement")
            .leftJoinAndSelect("achievement.person", "person")
            .leftJoinAndSelect("achievement.badge", "badge")
            .where("person.id = :personId")
            .andWhere("badge.id = :badgeId")
            .setParameters({ personId: personId.value, badgeId: badgeId.value })
            .getOne();

        return achievement ? mapEntityToAchievementDomain(achievement) : null;
    }

    public async findAllByBadgeId(badgeId: BadgeId): Promise<Achievement[]> {
        const achievements = await this.achievementRepository.createQueryBuilder("achievement")
            .leftJoinAndSelect("achievement.person", "person")
            .leftJoinAndSelect("achievement.badge", "badge")
            .where("badge.id = :badgeId")
            .andWhere("badge.isActive = :badgeActive")
            .andWhere("person.isActive = :personActive")
            .setParameters({ badgeActive: true, personActive: true, badgeId: badgeId.value })
            .getMany();

        return achievements.map(achievement => mapEntityToAchievementDomain(achievement));
    }

    public async findAllByPersonId(personId: PersonId): Promise<Achievement[]> {
        const achievements = await this.achievementRepository.createQueryBuilder("achievement")
            .leftJoinAndSelect("achievement.person", "person")
            .leftJoinAndSelect("achievement.badge", "badge")
            .where("person.id = :personId")
            .andWhere("badge.isActive = :badgeActive")
            .andWhere("person.isActive = :personActive")
            .setParameters({ badgeActive: true, personActive: true, personId: personId.value })
            .getMany();

        return achievements.map(achievement => mapEntityToAchievementDomain(achievement));
    }
}