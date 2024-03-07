import {EmployeeResponse} from 'model/responses';

export interface EmployeeReducer {
  data: EmployeeResponse;
  loading: boolean;
}
