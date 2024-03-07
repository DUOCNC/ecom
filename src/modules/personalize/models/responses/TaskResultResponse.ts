export interface TaskResultResponse {
  quizId: number;
  assigneeCode?: string;
  minPointToPass?: string;
  numberOfCorrect?: number;
  numberOfTested?: number;
  pass?: boolean;
  ratio?: string;
  remainingTimes?: number;
  totalNumber?: number;
  status?: 'completed' | 'wrong' | 'waiting' | 'training' | 'learn' | 'quiz';
  step?: number;
}
export interface TaskUpdateResponse {
  assigneeCode: string;
  minPointToPass: string;
  numberOfCorrect: number;
  numberOfTested: number;
  pass: boolean;
  ratio: string;
  remainingTimes: number;
  totalNumber: number;
  status?: 'completed' | 'wrong' | 'waiting';
}
