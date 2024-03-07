import {OtherMenuType} from '../enums';
import {OtherMenuTypeEntity} from '../models';

const OtherMenuTypeConfig: Array<OtherMenuTypeEntity> = [
  new OtherMenuTypeEntity(
    '1',
    'Báo cáo',
    false,
    1,
    OtherMenuType.ReportPersonal,
  ),
  new OtherMenuTypeEntity('2', 'Quản lý', true, 2, OtherMenuType.ReportGeneral),
  new OtherMenuTypeEntity('3', 'Tiện ích', false, 3, OtherMenuType.Extension),
  new OtherMenuTypeEntity('4', 'Cài đặt', false, 4, OtherMenuType.Setting),
];

export default OtherMenuTypeConfig;
