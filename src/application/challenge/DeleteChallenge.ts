import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";

export class DeleteChallenge {
  constructor(private repository: ChallengeRepository) {}

  async run(challengeId: ChallengeId): Promise<void> {
    return await this.repository.deleteChallenge(challengeId);
  }
}
