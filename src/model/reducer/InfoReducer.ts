export interface AppInfo {
  firstLoad: boolean;
}

export interface InfoReducer {
  isLoad: boolean;
  info: AppInfo | null;
}
