export interface FeedbackRequest {
  id?: number;
  type: string;
  name: string;
  code: string;
  note: string;
  storeId: number;
  sourceId: number;
  advisorName: string | null;
  advisorCode: string | null;
  status: string;
  questions: Array<QuestionRequest>;
  totalVisitor: number;
  deleted: boolean;
  revision: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionRequest {
  id?: number;
  formId: number;
  questionId: number;
  feedbackId: number;
  position: number;
  type: string;
  required: boolean;
  key: string;
  deleted: boolean;
  revision: number;
  answers: Array<AnswerRequest>;
  value: string;
  isHidden: boolean;
}

export interface AnswerRequest {
  id?: number;
  formId: number;
  formQuestionId: number;
  feedBackQuestionId: number;
  answerId: number;
  deleted: boolean;
  revision: number;
  value: string;
  isAnswer: boolean;
}
