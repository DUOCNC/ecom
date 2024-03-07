import {KeyBehaviorRequest} from '../entities/BehaviorEntity';

export interface StatusUpdateRequest {
  action: string;
  advisorName: string | null;
  advisorCode: string | null;
  key_behaviors?: KeyBehaviorRequest[];
}
