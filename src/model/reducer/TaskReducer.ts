import {TaskEntity} from 'modules/personalize/models/entities';
import {TaskResultResponse} from 'modules/personalize/models/responses';

export interface TaskReducer {
  isLoad: boolean;
  task: TaskResultResponse | null;
  taskEntity?: TaskEntity | null;
}

export interface PayloadTask {
  task: TaskResultResponse | null;
  taskEntity?: TaskEntity | null;
}
