import {EmployeeResponse} from 'model/responses/EmployeeResponse';

export const EmployeeHelper = {
  checkEcontractStatus: (employee: EmployeeResponse) => {
    let status = true;
    //1.Có hợp đồng đang hiệu lực thì kiểm tra đã ký số chưa
    //2.Không có hợp đồng nào đang hiệu lực thì cho chấm công
    if (employee && employee.contracts) {
      if (employee.contracts.length > 0) {
        const contractsValid = employee.contracts.filter(
          e => e.status.toLowerCase() === 'đang hiệu lực',
        );
        if (contractsValid && contractsValid.length > 0) {
          if (
            contractsValid.findIndex(
              e => e.econtractStatus.toLowerCase() === 'hoàn thành',
            ) !== -1
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    return status;
  },
};
