import {
  AssigneeExpectedSalaryEntity,
  StaffExpectedSalaryEntity,
  LeadExpectedSalaryEntity,
  ProbationaryLeadExpectedSalaryEntity,
  ProbationaryAssigneeExpectedSalaryEntity,
} from '../../models';
import {ExpectPosition} from '../../enums';
class ExpectedSalaryFactory {
  private constructor() {}

  static getExpectedSalary(
    fromDate: Date,
    toDate: Date,
    username: string,
    position: ExpectPosition,
  ) {
    switch (position) {
      case ExpectPosition.assignee:
        return new AssigneeExpectedSalaryEntity(fromDate, toDate, username);
      case ExpectPosition.staff:
        return new StaffExpectedSalaryEntity(fromDate, toDate, username);
      case ExpectPosition.leadShop:
        return new LeadExpectedSalaryEntity(fromDate, toDate, username);
      case ExpectPosition.probationaryLeadShop:
        return new ProbationaryLeadExpectedSalaryEntity(
          fromDate,
          toDate,
          username,
        );
      case ExpectPosition.probationaryAssignee:
        return new ProbationaryAssigneeExpectedSalaryEntity(
          fromDate,
          toDate,
          username,
        );
      default:
        return null;
    }
  }
}

export default ExpectedSalaryFactory;
