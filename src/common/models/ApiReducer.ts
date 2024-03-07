export interface ApiReducer<T> {
  data: T | null;
  isLoad: boolean;
  loading: boolean;
  error: string | false;
}
