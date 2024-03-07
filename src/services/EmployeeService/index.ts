import {MainStore} from 'reduxs/MainStore';
import EmployeeApi from 'api/EmployeeApi';
import {
  clearEmployee,
  loadingEmployee,
  saveEmployee,
} from 'reduxs/EmployeeReducer';
import BaseService from 'services/BaseService';

class EmployeeService extends BaseService {
  private readonly employeeApi: EmployeeApi;
  constructor() {
    super();
    this.employeeApi = new EmployeeApi();
  }

  getEmployeeDetail(code: string) {
    MainStore.dispatch(loadingEmployee());
    this.employeeApi
      .getEmployeeDetail(code)
      .then(res => {
        if (res.data && res.data.data) {
          MainStore.dispatch(saveEmployee(res.data.data));
        }
      })
      .catch(() => {
        MainStore.dispatch(clearEmployee());
      })
      .finally(() => {
        MainStore.dispatch(loadingEmployee());
      });
  }
}

export const employeeService = new EmployeeService();

export default EmployeeService;
