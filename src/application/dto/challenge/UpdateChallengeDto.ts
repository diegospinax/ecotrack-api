import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";

export class UpdateChallengeDto {
    constructor(
        public readonly id: ChallengeId
    ) { }
}