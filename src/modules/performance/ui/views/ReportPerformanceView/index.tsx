import React from 'react';
import {View} from 'react-native';
import ReportPerformanceItem from '../ReportPerformanceItem';
import {
  ic_average,
  ic_num_document,
  ic_performance,
  ic_rate_conversion,
  ic_rp_customer,
  ic_time,
} from 'assets/images';
import style from './style';
import {PerformanceEntity} from 'modules/performance/models';

interface Props {
  performance: PerformanceEntity;
}

const ReportPerformanceView: React.FC<Props> = ({performance}) => {
  return (
    <View style={style.container}>
      <View style={[style.row, style.rowMargin]}>
        <ReportPerformanceItem
          title="Tỉ lệ chuyển đổi"
          image={ic_rate_conversion}
          value={performance.getRate()}
          type="h3"
        />
        <ReportPerformanceItem
          value={performance.getNumberOrder()}
          title="Số đơn bán"
          image={ic_num_document}
          type="h3"
        />
        <ReportPerformanceItem
          value={performance.getNumberCustomer()}
          imageStyle={style.rpCustomer}
          title="Số khách mua"
          image={ic_rp_customer}
          type="h3"
        />
      </View>
      <View style={style.row}>
        <ReportPerformanceItem
          value={performance.getAverage()}
          title="GTTB/Đơn"
          type="h3"
          image={ic_average}
        />
        <ReportPerformanceItem
          value={performance.getWorkHour()}
          title="Tổng giờ công"
          type="h3"
          image={ic_time}
        />
        <ReportPerformanceItem
          value={performance.getPerformance()}
          title="Hiệu suất (/h)"
          type="h4"
          image={ic_performance}
        />
      </View>
    </View>
  );
};

export default ReportPerformanceView;
