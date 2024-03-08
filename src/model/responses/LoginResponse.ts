export interface LoginResponse {
  Id: string;
  UserName: string;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Division: number;
  res_id: number;
  usr_id: string;
  job_title: string;
  costcenter: string;
  repto_id: number;
  telnr_prv: string;
  Active: boolean;
  ProfilePicture: string;
  ProfilePicturePath: string;
  AccessToken: string;
  loginMess: string | null;
  ApplicationId: string;
  NeedChangePass: boolean;
  messenger: string;
}
