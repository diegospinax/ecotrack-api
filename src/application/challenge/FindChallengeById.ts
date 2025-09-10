import { Challenge } from "./../../domain/challenge/Challenge";
import { ChallengeRepository } from "@/domain/challenge/ports/ChallengeRepository";
import ChallengeId from "@/domain/challenge/value-objects/ChallengeId";

export class FindChallengeById {
  constructor(private repository: ChallengeRepository) {}

  async run(challengeId: ChallengeId): Promise<Challenge> {
    return await this.repository.findById(challengeId);
  }
}
