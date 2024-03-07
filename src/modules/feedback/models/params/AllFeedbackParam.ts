export interface AllFeedbackParam {
  question_filter?: Array<number>;
  source_id?: number;
  page?: number;
  limit?: number;
  status?: string;
  advisorCode?: string;
  deleted?: boolean;
  storeIds?: string;
  positionId?: number;
  createdAtFrom: string;
  createdAtTo: string;
}

export interface LotFeedbackParam {
  storeIds: Array<number>;
  isStoreOnly: boolean;
  positionId?: number;
}
