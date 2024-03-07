export interface TaskRequest {
  task_id: number;
  answer_requests: Array<AnswerRequests>;
}
export interface AnswerRequests {
  template_sub_task_id: number;
  answer: string;
}

export interface DelayTaskPutRequests {
  numberOfMinutes: number;
}

export interface MyTaskRequest {
  page?: number;
  info?: string;
  limit?: number;
}
