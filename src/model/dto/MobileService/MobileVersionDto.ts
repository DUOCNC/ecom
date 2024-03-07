import {BaseDto} from 'model/base/BaseDto';

export interface MobileVersionDto extends BaseDto {
  name: string;
  version_number: number;
  require_update: boolean;
  status: string;
  os: string;
  title: string;
  description: string;
  expected_publish_date: string;
  publish_date: string;
  un_publish_date: string | null;
}

export interface NextVersionDto {
  current: MobileVersionDto;
  next_version: MobileVersionDto | null;
}
