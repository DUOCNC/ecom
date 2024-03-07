import {BaseDto} from 'model/base/BaseDto';

export interface CustomerGroupDto extends BaseDto {
  active: boolean;
  name: string;
  note: string;
}
