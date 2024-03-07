import {ic_admin, ic_pos_2} from 'assets/images';
import {ChannelEntity} from '../models';

const ChannelConfig: Array<ChannelEntity> = [
  new ChannelEntity(1, 'pos', 'Bán hàng tại quầy', ic_pos_2, false),
  new ChannelEntity(2, 'admin', 'Bán hàng online', ic_admin, true),
];

export default ChannelConfig;
