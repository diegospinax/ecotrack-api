import TaskDescription from "./value-objects/TaskDescription";
import TaskId from "./value-objects/TaskId";
import TaskTime from "./value-objects/TaskTime";
import TaskTitle from "./value-objects/TaskTitle";
import TaskType from "./value-objects/TaskType";

export interface Task {
  id: TaskId;
  title: TaskTitle;
  description: TaskDescription;
  type: TaskType;
  Time: TaskTime;
}
