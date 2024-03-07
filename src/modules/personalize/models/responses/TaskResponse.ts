import {TrainingResponse} from './TrainingResponse';

export interface Task {
  id: number;
  dueDate: string;
  assignTo: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: null | string;
  lastModifiedDate: null | string;
  template: Template | null;
  subTasks: SubTask[];
  result?: TaskResult | null;
  status?: string;
  metafields?: MetafieldResponse[] | null;
}

export interface TaskResponse {
  assignTo: string;
  dueDate: string;
  tasks: Task[];
}

export interface Template {
  id: number;
  title: string;
  description: string;
  assignStrategyJson: string;
  subTasks: null | SubTask[];
  metafields: MetafieldResponse[];
  training: TrainingResponse;
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export interface TemplateSubTaskResponse {
  id: number;
  title: string;
  description?: string;
  assignStrategyJson?: string;
  subTasks?: null | SubTask[];
  metafields: MetafieldResponse[];
  category: CategoryResponse | null;
}

export interface TemplateResponse {
  template: Template;
}

export interface SubTask {
  id: number;
  resolved: boolean;
  resolvedDate: null | string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: null | string;
  lastModifiedDate: null | string;
  title: string;
  sortedKey: string;
  category: CategoryResponse;
  metafields: MetafieldResponse[];
  template: TemplateSubTaskResponse;
}

export interface SubTaskResponse {
  subTasks: SubTask[];
}

export interface MetafieldResponse {
  key: string;
  value: string;
  selected?: boolean;
}

export interface TaskResult {
  startAt: string;
  finishAt: string;
  numberOfTested: number;
  numberOfCorrect: number;
  totalNumber: number;
  remainingTimes: number;
  minPointToPass: string;
  ratio: string;
  pass: boolean;
}
