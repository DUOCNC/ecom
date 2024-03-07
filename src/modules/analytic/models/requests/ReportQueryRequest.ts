import {BaseRequest} from 'model/request/BaseRequest';
import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';

export interface ReportQueryRequest extends BaseRequest {
  from_date?: string;
  to_date?: string;
  view_date?: string;
  pos_location_department_lv2?: string; //ASM
  pos_location_department_lv3?: string; //CHT
  pos_location_name?: string; //CH
  assignee_name?: string; //thu ngân
  staff_name?: string; //thu ngân
  assignee_code?: string;
  staff_code?: string;
  view_type?: string;
  source?: ReportCustomerTab;
  economic_region?: string;
  store_id?: number;
}
