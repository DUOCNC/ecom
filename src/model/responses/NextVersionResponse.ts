import {MobileVersionResponse} from './MobileVersionResponse';

export interface NextVersionResponse {
  current: MobileVersionResponse;
  nextVersion: MobileVersionResponse | null;
}
