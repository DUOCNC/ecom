import {MobileVersionResponse} from 'model/responses';

export interface VersionReducer {
  isLoad: boolean;
  current: MobileVersionResponse | null;
  next: MobileVersionResponse | null;
}

export interface PayloadVersion {
  current: MobileVersionResponse;
  next: MobileVersionResponse | null;
}
