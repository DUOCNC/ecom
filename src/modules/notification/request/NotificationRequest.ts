// export interface NotificationRequest {
//   code: string;
//   token: string;
//   OperaSystem: 'ios' | 'android';
// }

export interface NotificationRequest {
  deviceName: string;
  token: string;
  type?: string;
  description?: string;
}
