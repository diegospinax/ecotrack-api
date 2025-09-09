import ChallengeId from "../value-objects/ChallengeId";
import { Challenge } from "./../Challenge";
export interface ChallengeRepository {
  createChallenge(challenge: Challenge): Promise<Challenge>;
  findById(challengeId: ChallengeId): Promise<Challenge>;
  updateChallenge(challenge: Challenge): Promise<void>;
  deleteChallenge(challengeId: ChallengeId): Promise<void>;
}
