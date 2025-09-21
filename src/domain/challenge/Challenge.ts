import { Person } from "../person/Person";
import { Task } from "./task/Task";
import ChallengeId from "./value-objects/ChallengeId";
import ChallengeIsFinished from "./value-objects/ChallengeIsFinished";
import ChallengeTimesDone from "./value-objects/ChallengeTimesDone";

export interface Challenge {
  id: ChallengeId;
  isFinished: ChallengeIsFinished;
  timesDone: ChallengeTimesDone;
  person: Person;
  task: Task;
}
