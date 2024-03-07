import {DateUtils} from 'common';
import {AwardApi, PerformanceApi} from '../api';
import BaseService from './BaseService';
import {DateFormatPattern} from 'common/enums';
import {PerformanceRequest, PerformanceResponse} from '../models';
import {PerformanceEntity} from '../models/entities';
import {ErrorType} from 'common-ui';
import {AwardEntity} from '../models/entities/AwardEntity';
import {RevenueRequest} from '../models/requests';
import EmployeeRevenueEntity from '../models/entities/EmployeeRevenueEntity';

export class PerformanceService extends BaseService {
  private readonly performanceApi: PerformanceApi;
  private readonly awardApi: AwardApi;
  constructor() {
    super();
    this.performanceApi = new PerformanceApi();
    this.awardApi = new AwardApi();
  }

  get(
    date: Date,
    onResult: (performanceEntity: PerformanceEntity) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    let formatDate = DateUtils.format(date, DateFormatPattern.YYYYMMDD);
    let performanceRequest: PerformanceRequest = {
      date: formatDate,
    };
    beforeCallApi && beforeCallApi();
    this.performanceApi
      .getPerformance(performanceRequest)
      .then(response => {
        let performanceResponse: PerformanceResponse = response.data;
        let performanceEntity: PerformanceEntity =
          PerformanceEntity.createFromResponse(performanceResponse, date);
        onResult(performanceEntity);
      })
      .catch(e => this.handlerCatch(e, onError))
      .finally(onFinally);
  }

  getAwardFor(
    awardFor: string,
    onResult: (awardEntities: Array<AwardEntity>) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.awardApi
      .getAwardForApi({awardFor: awardFor})
      .then(response => {
        if (response.data) {
          const res = AwardEntity.fromResponseArray(response.data);
          if (res.length === 0) {
            onError && onError('NotfoundReport', '');
            return;
          }
          onResult(res);
        } else {
          onError && onError('NotfoundReport', '');
        }
      })
      .catch(e => this.handlerCatch(e, () => {}))
      .finally(onFinally);
  }
  getAwards(
    onResult: (awardEntities: Array<AwardEntity>) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.awardApi
      .getAwardsApi()
      .then(response => {
        if (response.data && response.data.length > 0) {
          const res = AwardEntity.fromResponseArray(response.data);
          onResult(res);
        } else {
          onError && onError('NotfoundReport', '');
        }
      })
      .catch(e => this.handlerCatch(e, () => {}))
      .finally(onFinally);
  }

  getTopEmployeeRevenue(
    employeeCode: string,
    request: RevenueRequest,
    onResult: (data: EmployeeRevenueEntity) => void,
    beforeCallApi: () => void,
    onError: () => void,
  ) {
    beforeCallApi();
    const req = {...request, storeName: undefined, rsm: undefined};
    this.performanceApi
      .getEmployeeRevenue(req)
      .then(response => {
        if (response.data) {
          const res = EmployeeRevenueEntity.fromResponse(
            'all',
            request.beginDate,
            employeeCode,
            response.data,
          );
          if (res.getOnTop()) {
            onResult(res);
            return;
          } else {
            //rsm
            const requestRsm = {...request, storeName: undefined};
            this.performanceApi
              .getEmployeeRevenue(requestRsm)
              .then(resRsm => {
                if (resRsm.data) {
                  const rsmEmployeeRevenueEntity =
                    EmployeeRevenueEntity.fromResponse(
                      'rsm',
                      request.beginDate,
                      employeeCode,
                      resRsm.data,
                    );
                  if (rsmEmployeeRevenueEntity.getOnTop()) {
                    onResult(rsmEmployeeRevenueEntity);
                    return;
                  } else {
                    //store
                    const requestStore = {...request, rsm: undefined};
                    this.performanceApi
                      .getEmployeeRevenue(requestStore)
                      .then(resStore => {
                        if (resStore.data) {
                          const storeEmployeeRevenueEntity =
                            EmployeeRevenueEntity.fromResponse(
                              'store',
                              request.beginDate,
                              employeeCode,
                              resStore.data,
                            );
                          onResult(storeEmployeeRevenueEntity);
                          return;
                        } else {
                        }
                      })
                      .catch(e => this.handlerCatch(e, onError));
                  }
                }
              })
              .catch(e => this.handlerCatch(e, onError));
          }
        }
      })
      .catch(e => this.handlerCatch(e, onError));
  }
}

const performanceService = new PerformanceService();

export default performanceService;
