import {BehaviorEntity} from '../entities/BehaviorEntity';
import {BehaviorResponse} from './BehaviorReponse';

export interface FeedbackResponse {
  createdBy: string;
  createdName: string;
  updatedBy: string;
  updatedName: string;
  requestId: string | null;
  operatorKcId: string | null;
  id: number;
  code: string;
  type: string;
  name: string;
  note: string;
  storeId: number;
  sourceId: number;
  advisorCode: string | null;
  advisorName: string | null;
  status: string;
  deleted: boolean;
  revision: number;
  createdAt: string;
  updatedAt: string;
  questions: Array<QuestionResponse>;
  keyBehaviors: Array<BehaviorResponse>;
}
export interface FeedbackStatusResponse {
  advisor_code: string;
  advisor_name: string;
  code: string;
  created_at: string;
  created_by: string;
  created_name: string;
  deleted: boolean;
  id: number;
  name: string;
  note: string;
  operator_kc_id: number;
  questions: Array<QuestionResponse>;
  request_id: number;
  revision: number;
  source_id: number;
  status: string;
  store_id: number;
  total_visitor: number;
  type: string;
  updated_at: string;
  updated_by: string;
  updated_name: string;
}

export interface QuestionResponse {
  id: number;
  formId: number;
  feedbackId: number;
  questionId: number;
  position: number;
  type: string;
  required: boolean;
  key: string;
  deleted: boolean;
  revision: number;
  answers: Array<AnswerResponse>;
  value: string;
  isHidden: boolean;
}

export interface AnswerResponse {
  id: number;
  formId: number;
  answerId: number;
  formQuestionId: number;
  feedBackQuestionId: number;
  value: string;
  deleted: boolean;
  revision: number;
  isAnswer: boolean;
}
