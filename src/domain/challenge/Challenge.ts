import PersonId from "../person/value-objects/PersonId";
import TaskId from "./task/value-objects/TaskId";
import ChallengeId from "./value-objects/ChallengeId";
import ChallengeIsFinished from "./value-objects/ChallengeIsFinished";
import ChallengeTimesDone from "./value-objects/ChallengeTimesDone";

export interface Challenge {
  id: ChallengeId;
  isFinished: ChallengeIsFinished;
  timesDone: ChallengeTimesDone;
  personId: PersonId;
  taskId: TaskId;
}
