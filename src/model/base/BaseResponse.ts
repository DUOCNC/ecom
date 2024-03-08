export interface BaseResponse<T> {
  ResponseStatus: string;
  ResponseData: T;
  ResponseMessenger: string;
}
