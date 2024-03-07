import {DateUtils} from 'common';
import {PersonnelEntity, ReportSaleOrderEntity} from '../models/entities';
import {PersonnelRequest, ReportSaleRequest} from '../models/requests';
import BaseService from './BaseService';
import {ReportApi} from 'modules/personalize/axios';
import {PersonnelResponse} from 'modules/personalize/models/responses';
import {DateFormatPattern} from 'common/enums';

class PersonnelService extends BaseService {
  private reportApi: ReportApi;
  constructor() {
    super();
    this.reportApi = new ReportApi();
  }

  getPersonnelSalary(
    request: PersonnelRequest,
    success: (data: Array<PersonnelEntity>) => void,
    error: (mess: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.reportApi
      .getPersonalSalary(request)
      .then(response => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const personnelEntityList = response.data.data.map(
            (item: PersonnelResponse, index) => {
              return PersonnelEntity.createFromResponse(item, index);
            },
          );
          success(personnelEntityList);
        } else {
          error('NotfoundReport');
        }
      })
      .catch(e => this.handlerCatch(e))
      .finally(onFinish);
  }

  getReportSale(
    request: ReportSaleRequest,
    success: (data: ReportSaleOrderEntity) => void,
    error: (mess: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    const today = new Date();
    request.currentDate = DateUtils.format(today, DateFormatPattern.YYYYMMDD);
    this.reportApi
      .getReportSaleApi(request)
      .then(response => {
        if (response.data && response.data.data) {
          success(ReportSaleOrderEntity.createFromResponse(response.data.data));
        } else {
          error('NotfoundReport');
        }
      })
      .catch(e => this.handlerCatch(e))
      .finally(onFinish);
  }
}

const personnelService = new PersonnelService();

export default personnelService;
