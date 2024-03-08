export interface BaseResult<T> {
  code: number;
  message: string;
  data: T;
  responseTime: string;
  errors: Array<string> | null;
  requestId: string | null;
}
