import PersonId from "@/domain/person/value-objects/PersonId";
import TaskId from "../task/value-objects/TaskId";
import ChallengeId from "../value-objects/ChallengeId";
import { Challenge } from "./../Challenge";
export interface ChallengeRepository {
  create(challenge: Omit<Challenge, "id">): Promise<Challenge>;
  findAll(): Promise<Challenge[]>;
  findAllByTaskId(taskId: TaskId): Promise<Challenge[]>;
  findAllByPersonId(personId: PersonId): Promise<Challenge[]>;
  findById(challengeId: ChallengeId): Promise<Challenge | null>;
  findByTaskIdAndPersonId(taskId: TaskId, personId: PersonId): Promise<Challenge | null>
  update(challenge: Challenge): Promise<void>;
} 
