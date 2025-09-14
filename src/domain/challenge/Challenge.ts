import PersonId from "../person/value-objects/PersonId";
import TaskId from "./task/value-objects/TaskId";
import ChallengeId from "./value-objects/ChallengeId";
import ChallengeStatus from "./value-objects/ChallengeStatus";
import ChallengeTime from "./value-objects/ChallengeTime";

export interface Challenge {
  id: ChallengeId;
  status: ChallengeStatus;
  timesDone: ChallengeTime;
  personId: PersonId;
  taskId: TaskId;
}
