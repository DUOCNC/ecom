import {BaseDto} from 'model/base/BaseDto';

export interface AccountPublicDto {
  id: number;
  code: string;
  full_name: string;
  status: string;
}

export interface TicketReasonDto extends BaseDto {
  id: number;
  reason: string;
}
