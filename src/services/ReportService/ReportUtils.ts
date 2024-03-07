import {Colors} from 'assets/colors';
import {DateFormatPattern} from 'common/enums';
import _ from 'lodash';
import {VariantDto} from 'model/dto/ProductService/VariantDto';
import {ReportAdvDto} from 'model/dto/ReportService/ReportDto';
import {ReportQuery} from 'model/query/ReportQuery';
import {BarChartView} from 'model/viewer/ReportViewer';
import moment from 'moment';
import {
  EnumReportExpectedSalary,
  EnumReportSaleType,
  EReportTabButton,
  EReportViewType,
  ReportTabButtonCf,
  ReportViewTypeCf,
  SalaryPositionIdsCf,
} from 'ui/screens/MainStack/Report/ReportConfig';
import {FormatDatePattern, getStartDateEndDatByDate} from 'utils/DateUtils';
import TranslateUtils from 'utils/TranslateUtils';

export interface ColorVariant {
  color_id: number;
  color: string;
  variants: Array<VariantDto>;
}

const replaceQueryIn = (str: string) => {
  let res = JSON.stringify(str.split(','));
  res = res.replace('[', '(').replace(']', ')');
  return res;
};

const getConditionAdv = (q: string, params: ReportQuery) => {
  let res = q,
    condition = '';
  let obj = _.cloneDeep(params);
  delete obj.from_date;
  delete obj.to_date;
  if (!obj) {
    q = q.replace('condition', condition);
    return q;
  }
  let searching = false;
  Object.values(obj).forEach(e => {
    if (e !== undefined && e !== '' && e !== null) {
      searching = true;
    }
  });
  if (!searching) {
    q = q.replace('condition', condition);
    return q;
  }

  let first = true;
  if (params.pos_location_department_lv2) {
    condition += `${
      first ? 'WHERE' : ''
    } pos_location_department_lv2 IN ${replaceQueryIn(
      params.pos_location_department_lv2,
    )}`;
    first = false;
  }
  if (params.pos_location_department_lv3) {
    condition += `${
      first ? 'WHERE' : ''
    } pos_location_department_lv3 IN ${replaceQueryIn(
      params.pos_location_department_lv3,
    )}`;
    first = false;
  }
  if (params.pos_location_name) {
    condition += `${first ? 'WHERE' : 'AND'} pos_location_name IN ('${
      params.pos_location_name
    }')`;
    first = false;
  }
  if (params.assignee_code) {
    condition += `${first ? 'WHERE' : 'AND'} assignee_code IN ${replaceQueryIn(
      params.assignee_code,
    )}`;
    first = false;
  }
  if (params.staff_code) {
    condition += `${first ? 'WHERE' : 'AND'} staff_code IN ${replaceQueryIn(
      params.staff_code,
    )}`;
    first = false;
  }
  res = res.replace('condition', condition);
  return res;
};

const ReportUtils = {
  getFullDto: (data: any) => {
    if (data && data.length === 0) {
      return [];
    }
    return data.map((e: any) => {
      return {
        data: e,
        textColor: Colors.Text,
        isChecked: false,
      };
    });
  },
  getParamForAdvan: (data: ReportQuery) => {
    let res: ReportAdvDto = {
      asm: [],
      store: [],
      storeLeader: [],
      assignCode: [],
      staffCode: [],
    };
    const color = Colors.Checked;
    const storeLeader = data.pos_location_department_lv3
      ? data.pos_location_department_lv3.split(';')
      : [];
    const asm = data.pos_location_department_lv2
      ? data.pos_location_department_lv2.split(';')
      : [];
    const store = data.pos_location_name
      ? data.pos_location_name.split(';')
      : [];
    const assignCode = data.assignee_code ? data.assignee_code.split(';') : [];
    const staffCode = data.staff_code ? data.staff_code.split(';') : [];
    if (storeLeader.length > 0) {
      for (let i = 0; i < storeLeader.length; i++) {
        res.storeLeader.push({
          data: {name: storeLeader[i], id: i},
          isChecked: true,
          textColor: color,
        });
      }
    }
    if (asm.length > 0) {
      for (let i = 0; i < asm.length; i++) {
        res.asm.push({
          data: {name: asm[i], id: i},
          isChecked: true,
          textColor: color,
        });
      }
    }
    if (store.length > 0) {
      for (let i = 0; i < store.length; i++) {
        res.store.push({
          data: {name: store[i], id: i},
          isChecked: true,
          textColor: color,
        });
      }
    }
    if (staffCode.length > 0) {
      for (let i = 0; i < staffCode.length; i++) {
        res.staffCode.push({
          data: {name: staffCode[i], id: i},
          isChecked: true,
          textColor: color,
        });
      }
    }
    if (assignCode.length > 0) {
      for (let i = 0; i < assignCode.length; i++) {
        res.assignCode.push({
          data: {name: assignCode[i], id: i},
          isChecked: true,
          textColor: color,
        });
      }
    }

    return res;
  },
  getParamByForFilter: (data: ReportAdvDto) => {
    let res: ReportQuery = {};
    if (data.asm.length > 0) {
      res.pos_location_department_lv2 = data.asm
        .map(e => e.data.name)
        .join(';');
    }
    if (data.store.length > 0) {
      res.pos_location_name = data.store.map(e => e.data.name).join(';');
    }
    if (data.storeLeader.length > 0) {
      res.pos_location_department_lv3 = data.storeLeader
        .map(e => e.data.name)
        .join(';');
    }
    if (data.assignCode.length > 0) {
      res.assignee_code = data.assignCode.map(e => e.data.name).join(';');
    }
    if (data.staffCode.length > 0) {
      res.staff_code = data.staffCode.map(e => e.data.name).join(';');
    }

    return res;
  },
  getQueryAverage: (params: ReportQuery) => {
    let template = `SHOW total_sales, orders, customers FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date}`;
    return getConditionAdv(template, params);
  },
  getQueryBestSaler: (params: ReportQuery, activeTab?: number) => {
    let orderByColumn = 'total_sales';
    if (activeTab === EReportTabButton.customer) {
      orderByColumn = 'customers';
    }
    if (activeTab === EReportTabButton.average) {
      orderByColumn = 'average_order_value';
    }
    let template = `SHOW orders, return_count, total_sales, average_order_value, customers, average_customer_spent, returns, gross_sales BY assignee_code,assignee_name FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date} ORDER BY ${orderByColumn} DESC`;
    return getConditionAdv(template, params);
  },
  getQueryStaff: (params: ReportQuery, activeTab?: number) => {
    let orderByColumn = 'total_sales';
    if (activeTab === EReportTabButton.customer) {
      orderByColumn = 'customers';
    }
    if (activeTab === EReportTabButton.average) {
      orderByColumn = 'average_order_value';
    }
    let template = `SHOW orders, return_count, total_sales, average_order_value, customers, average_customer_spent, returns, gross_sales BY staff_code,staff_name FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date} ORDER BY ${orderByColumn} DESC`;
    return getConditionAdv(template, params);
  },
  conversionRate: (a: number | undefined) => {
    //AI-479
    if (a) {
      return `${a}%`;
    } else {
      if (a === 0) {
        return '-';
      }
      return '0';
    }
  },
  getQueryReportRetail: (
    params: ReportQuery,
    activeTab: number,
    viewType: string,
  ) => {
    const query = {
      tab:
        ReportTabButtonCf.find(e => e.id === activeTab)?.key ??
        EReportTabButton.revenue,
      viewType:
        ReportViewTypeCf.find(e => e.value === viewType)?.key ??
        EReportViewType.day,
    };
    let template = `SHOW ${query.tab} BY ${query.viewType} FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date}`;
    return getConditionAdv(template, params);
  },
  getReportDetailRetailChart: (params: ReportQuery, screen: string) => {
    let template = `SHOW total_sales, customers, orders BY assignee_code,assignee_name FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date}`;
    if (screen === EnumReportSaleType.cashier) {
      template = `SHOW total_sales, customers, orders BY staff_name, staff_code FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date}`;
    }
    return getConditionAdv(template, params);
  },
  getLabelByViewType: (viewType: number, label: string) => {
    if (viewType === EReportViewType.week) {
      return ` ${TranslateUtils.t(moment(label).format('ddd'))}   ${moment(
        label,
      ).format(FormatDatePattern['DD/MM'])}`;
    }
    if (viewType === EReportViewType.year) {
      return moment(label).format(FormatDatePattern['MM/YY']);
    }

    return moment(label).format(FormatDatePattern['HH:mm']);
  },
  getQueryCustomers: (params: ReportQuery) => {
    let template = `SHOW customers FROM offline_sales condition SINCE ${params.from_date} UNTIL ${params.to_date}`;
    return getConditionAdv(template, params);
  },
  getQueryExpectedSalary: (
    positionId: number | null,
    fromDate: string,
    toDate: string,
    userName: string,
  ) => {
    let template = `SHOW total_sales BY day FROM offline_sales WHERE assignee_name IN ('${userName}') SINCE ${fromDate} UNTIL ${toDate} ORDER BY day DESC`;
    switch (positionId) {
      case EnumReportExpectedSalary.staff:
        template = `SHOW total_sales BY day FROM offline_sales WHERE staff_name IN ('${userName}') SINCE ${fromDate} UNTIL ${toDate} ORDER BY day DESC`;
        break;
      case EnumReportExpectedSalary.leadShop:
      case EnumReportExpectedSalary.probationaryLeadShop:
        template = `SHOW total_sales  BY day FROM offline_sales SINCE ${fromDate} UNTIL ${toDate} ORDER BY day DESC`;
        break;
      default:
        break;
    }
    return template;
  },

  getTemplateChartReportRetail: (viewType: number, date?: string) => {
    let template: Array<BarChartView> = [];
    const viewDate = date ? new Date(date) : new Date();
    switch (viewType) {
      case EReportViewType.day:
        for (let index = 8; index <= 23; index++) {
          if (index < 10) {
            template.push({label: `0${index}:00`, value: 0});
          } else {
            template.push({label: `${index}:00`, value: 0});
          }
        }
        break;
      case EReportViewType.week:
        const week = getStartDateEndDatByDate(viewDate);
        for (let i = 0; i < 7; i++) {
          const element = moment(new Date(week[0]))
            .add(i, 'd')
            .format(DateFormatPattern.YYYYMMDD);
          template.push({
            label: ReportUtils.getLabelByViewType(viewType, element),
            value: 0,
          });
        }
        break;
      case EReportViewType.year:
        for (let i = 1; i <= 12; i++) {
          let label = '';
          if (i < 10) {
            label = `0${i}/${moment(date).format('YY')}`;
          } else {
            label = `${i}/${moment(date).format('YY')}`;
          }
          template.push({
            label: label,
            value: 0,
          });
        }
        break;
    }

    return template;
  },
};

export const toCamelCase = (s: string): string => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const keysToCamelCase = (o: any): any => {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
    const n: {[key: string]: any} = {};
    Object.keys(o).forEach(key => {
      n[toCamelCase(key)] = keysToCamelCase(o[key]);
    });
    return n;
  } else if (Array.isArray(o)) {
    return o.map(i => {
      return keysToCamelCase(i);
    });
  }
  return o;
};

export const getAmountSymbol = (amount: number) => {
  const amountView = Math.abs(amount);
  if (amountView > 1000000000) {
    return `${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amountView > 100000000) {
    return `${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amountView > 1000000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  }
  if (amountView > 100000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  }
  if (amountView > 1000) {
    return `${(amount / 1000).toFixed(2)}K`;
  }
  return amount;
};

export const getyAxisLabelTexts = (max: number) => {
  let yAxisLabelTexts: number[] = [0];
  const step = parseFloat((max / 5).toFixed(2));
  for (let index = 1; index < 5; index++) {
    const nextStep = yAxisLabelTexts[index - 1] + step;
    yAxisLabelTexts.push(nextStep);
  }
  yAxisLabelTexts.push(max);
  let res = yAxisLabelTexts.map((e: number, index: number) => {
    if (index === 0) {
      return e.toString();
    }
    return `${getAmountSymbol(parseFloat(e.toFixed(2)))}`;
  });
  res = [...new Set(res)];
  return res;
};

export const getRateByPosition = (positionId: number | undefined | null) => {
  const position = SalaryPositionIdsCf.find(e => e.positionId === positionId);
  if (!position) {
    return undefined;
  }
  return position.rate;
};

export default ReportUtils;
