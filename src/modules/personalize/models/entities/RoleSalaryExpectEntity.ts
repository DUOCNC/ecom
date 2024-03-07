import {DataItemExpectSalary} from 'modules/personalize/models/interface/DataItemExpectSalary';

export default class RoleSalaryExpectEntity {
  positionId: number;
  name: string;
  data: Array<DataItemExpectSalary>;

  constructor(
    positionId: number,
    name: string,
    data: Array<DataItemExpectSalary>,
  ) {
    this.positionId = positionId;
    this.name = name;
    this.data = data;
  }

  getPositionId() {
    return this.positionId;
  }

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
  }
}
