import { AchievementRepository } from "@/domain/achievement/ports/AchievementRepository";
import { CreateAchievementUseCase } from "./cases/CreateAchievementUseCase";
import { FindAchievementUseCase } from "./cases/FindAchievementUseCase";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import { BadgeRepository } from "@/domain/achievement/badge/ports/BadgeRepository";
import { Achievement } from "@/domain/achievement/Achievement";
import PersonId from "@/domain/person/value-objects/PersonId";
import { CreateAchievementDto } from "@/application/dto/achievement/CreateAchievementDto";
import { UseCaseException } from "@/application/exception/UseCaseException";
import AchievementDateReceived from "@/domain/achievement/value-objects/AchievementDateReceived";
import { Person } from "@/domain/person/Person";
import BadgeId from "@/domain/achievement/badge/value-objects/BadgeId";
import { Badge } from "@/domain/achievement/badge/Badge";

export class AchievementUseCase implements CreateAchievementUseCase, FindAchievementUseCase {
    constructor(
        private achievementRepository: AchievementRepository,
        private personRepository: PersonRepository,
        private badgeRepository: BadgeRepository
    ) { }

    public async create(achievementDto: CreateAchievementDto): Promise<Achievement> {
        const existingPerson = await this.validateExistingPerson(achievementDto.personId);
        const existingBadge = await this.validateExistingBadge(achievementDto.badgeId);

        const existingAchievement = await this.achievementRepository.findByPersonIdAndBadgeId(achievementDto.personId, achievementDto.badgeId);

        if (existingAchievement)
            throw new UseCaseException("Person already won that badge.");

        const achievement: Omit<Achievement, "id"> = {
            badge: existingBadge,
            person: existingPerson,
            date: new AchievementDateReceived(new Date())
        }

        return await this.achievementRepository.create(achievement);
    }

    public async findAll(): Promise<Achievement[]> {
        return await this.achievementRepository.findAll();
    }

    public async findAllByPersonId(personId: PersonId): Promise<Achievement[]> {
        const existingPerson = await this.validateExistingPerson(personId);

        return await this.achievementRepository.findAllByPersonId(existingPerson.id);
    }

    public async findAllByBadgeId(badgeId: BadgeId): Promise<Achievement[]> {
        const existingBadge = await this.validateExistingBadge(badgeId);

        return await this.achievementRepository.findAllByBadgeId(existingBadge.id);
    }

    private async validateExistingPerson(personId: PersonId): Promise<Person> {
        const existingPerson = await this.personRepository.findById(personId);

        if (!existingPerson)
            throw new UseCaseException(`Person not found for id: ${personId.value}`);

        return existingPerson;
    }

    private async validateExistingBadge(badgeId: BadgeId): Promise<Badge> {
        const existingBadge = await this.badgeRepository.findById(badgeId);

        if (!existingBadge)
            throw new UseCaseException(`Badge not found for id: ${badgeId.value}`)

        return existingBadge;
    }
}