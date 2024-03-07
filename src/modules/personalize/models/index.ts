import {IExpectedSalary} from './interface';
import {
  QueryResponse,
  AnalyticResponse,
  RequestDeleteResponse,
  CustomerVisitorResponse,
  AccountResponse,
} from './responses';
import {CustomerVisitorRequest, QueryRequest} from './requests';

import {
  MyWorkEntity,
  OtherMenuEntity,
  OtherMenuTypeEntity,
  ArticleEntity,
  ExpectedSalaryDetailEntity,
  ExpectedSalaryEntity,
  AssigneeExpectedSalaryEntity,
  StaffExpectedSalaryEntity,
  LeadExpectedSalaryEntity,
  ProbationaryLeadExpectedSalaryEntity,
  ProbationaryAssigneeExpectedSalaryEntity,
  ReportEntity,
  CustomerVisitorEntity,
  StoreEntity,
  StoreActiveEntity,
  GenderEntity,
  AccountEntity,
  AccountJobEntity,
} from './entities';

export type {
  IExpectedSalary,
  AnalyticResponse,
  QueryResponse,
  QueryRequest,
  RequestDeleteResponse,
  CustomerVisitorResponse,
  CustomerVisitorRequest,
  AccountResponse,
};

export {
  ExpectedSalaryDetailEntity,
  OtherMenuTypeEntity,
  ExpectedSalaryEntity,
  AssigneeExpectedSalaryEntity,
  StaffExpectedSalaryEntity,
  LeadExpectedSalaryEntity,
  ProbationaryAssigneeExpectedSalaryEntity,
  ProbationaryLeadExpectedSalaryEntity,
  MyWorkEntity,
  OtherMenuEntity,
  ArticleEntity,
  ReportEntity,
  CustomerVisitorEntity,
  StoreEntity,
  StoreActiveEntity,
  GenderEntity,
  AccountEntity,
  AccountJobEntity,
};
