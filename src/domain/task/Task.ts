import type { ActionType } from "../types";

export interface Task {
  id: number;
  title: string;
  description: string;
  type: ActionType;
  times: number
}

