import {BaseAuditResponse} from 'common';

export interface MobileVersionResponse extends BaseAuditResponse {
  id: number;
  name: string;
  versionNumber: number;
  requireUpdate: boolean;
  status: string;
  os: string;
  title: string;
  description: string;
  expectedPublishDate: string;
  publishDate: string;
  unPublishDate: string | null;
}
