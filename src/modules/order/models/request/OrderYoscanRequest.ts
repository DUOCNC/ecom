import {ReactNode} from 'react';

export interface OrderYoscanRequest {
  page: number;
  limit: number;
  codes?: Array<string>;
  createdBy?: Array<string>;
  storeIds?: Array<number>;
}
export interface OrderYoscanDetailRequest {
  ignoreExpiredTime: boolean;
}

export interface TabProps {
  key: string;
  title: string;
  component: ReactNode;
}
