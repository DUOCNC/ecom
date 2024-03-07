import DateUtils from 'common/utils/DateUtilts';
import {AnalyticApi} from '../axios';
import {ExpectPosition} from '../enums';
import {ExpectedSalaryEntity} from '../models';
import BaseService from './BaseService';
import ExpectedSalaryFactory from './factory/ExpectedSalaryFactory';

class ExpectedSalaryService extends BaseService {
  private analyticApi: AnalyticApi;
  constructor() {
    super();
    this.analyticApi = new AnalyticApi();
  }

  private getExpectedSalaryApi(
    date: Date,
    user: string,
    position: ExpectPosition,
    getExpectData: (data: null | ExpectedSalaryEntity) => void,
    getExpectError: (code: string, error: string) => void,
  ) {
    const fromDate = DateUtils.getStartDateOfMonth(date);
    const toDate = DateUtils.getLastDateOfMonth(date);
    const expectedSalary = ExpectedSalaryFactory.getExpectedSalary(
      fromDate,
      toDate,
      user,
      position,
    );
    if (expectedSalary == null) {
      getExpectData(null);
      return;
    }
    const query = expectedSalary.getQuery();
    this.analyticApi
      .getAnalytic({q: query})
      .then(res => {
        expectedSalary.setAnalytic(res.data);
        getExpectData(expectedSalary);
      })
      .catch(error => {
        this.handlerCatch(error, (code, msg) => {
          getExpectError(code, msg);
        });
      });
  }

  getFirstExpectedSalary(
    date: Date,
    user: string,
    position: ExpectPosition,
    getExpectData: (data: null | ExpectedSalaryEntity) => void,
    getExpectError: (code: string, error: string) => void,
  ) {
    this.getExpectedSalaryApi(
      date,
      user,
      position,
      getExpectData,
      getExpectError,
    );
  }

  getExpectedSalary(
    beforeCallApi: () => void,
    date: Date,
    user: string,
    position: ExpectPosition,
    getExpectData: (data: null | ExpectedSalaryEntity) => void,
    getExpectError: (code: string, error: string) => void,
  ) {
    beforeCallApi();
    this.getExpectedSalaryApi(
      date,
      user,
      position,
      getExpectData,
      getExpectError,
    );
  }
}

const expectedSalaryService = new ExpectedSalaryService();

export default expectedSalaryService;
