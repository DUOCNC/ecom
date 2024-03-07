import AnalyticApi from '../api/AnalyticApi';
import CustomerVisitorApi from '../api/CustomerVisitorApi';
import {ReportCustomerTab} from '../enums/ReportConfig';
import {
  CustomerVisitorEntity,
  ReportAssigneeEntity,
  ReportCustomerVisitorDetailEntity,
} from '../models/entities';
import {ReportQueryRequest} from '../models/requests';
import {CustomerSaleResponse} from '../models/responses/CustomerSaleResponse';
import BaseService from './BaseService';

class CustomerVisitorService extends BaseService {
  private customerVisitorApi: CustomerVisitorApi;
  private analyticApi: AnalyticApi;

  constructor() {
    super();
    this.customerVisitorApi = new CustomerVisitorApi();
    this.analyticApi = new AnalyticApi();
  }

  getCustomerVisitor(
    request: ReportQueryRequest,
    getExpectData: (
      customerVisitor: CustomerVisitorEntity,
      customerReceived: CustomerVisitorEntity,
    ) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const customerVisitorEntity =
      CustomerVisitorEntity.createWithParam(request);
    const customerReceived = CustomerVisitorEntity.createWithParam(request);

    //khách vào ch
    this.customerVisitorApi
      .get(customerVisitorEntity.getQuery(ReportCustomerTab.receptionist))
      .then(res => {
        if (res.data) {
          customerVisitorEntity.setCustomerVisitor(res.data);
          //khách đã tiếp
          this.customerVisitorApi
            .get(customerVisitorEntity.getQuery(ReportCustomerTab.assignee))
            .then(resCustomerReceived => {
              if (resCustomerReceived.data) {
                customerReceived.setCustomerVisitor(resCustomerReceived.data);
                getExpectData(customerVisitorEntity, customerReceived);
              }
            })
            .catch(error => {
              this.handlerCatch(error, msg => {
                getExpectError(msg);
              });
            });
        }
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
        });
      });
  }

  getCustomerVisitorDetail(
    date: Date,
    ids: Array<number>,
    storeName: string,
    onResponse: (employee: Array<ReportAssigneeEntity>) => void,
    onFinally: () => void,
    source?: string,
  ) {
    let customerVisitor = ReportCustomerVisitorDetailEntity.createWithParam(
      date,
      ids,
      source,
    );
    this.customerVisitorApi
      .getDetail(customerVisitor.getQuery())
      .then(response => {
        if (response.data.length > 0) {
          customerVisitor.setDataVisitor(response.data);
          let employee: Array<ReportAssigneeEntity> = [];
          let assigneeSale: Array<CustomerSaleResponse> = [];

          this.analyticApi
            .getAnalytic({
              q: customerVisitor.getCustomerSaleQuery(storeName, date),
            })
            .then(resCustomer => {
              if (resCustomer && resCustomer.data.result.data) {
                resCustomer.data.result.data.filter(e => {
                  assigneeSale.push({
                    assigneeName: e[0],
                    assigneeCode: e[1],
                    customers: e[2],
                  });
                });
                //gộp assignee
                employee = customerVisitor.getEmployee(date, assigneeSale);
                onResponse(employee);
              }
            })
            .catch(error => this.handlerCatch(error));
        }
      })
      .catch(e => this.handlerCatch(e))
      .finally(onFinally);
  }

  queryCustomersSale() {
    return;
  }
}

const customerVisitorService = new CustomerVisitorService();

export default customerVisitorService;
