import {
  tab_home,
  tab_home_active,
  tab_other,
  tab_other_active,
  tab_product,
  tab_product_active,
} from 'assets/images';
import {ImageSourcePropType} from 'react-native';
import {BottomMainConfig} from 'config/RouteConfig';
import {FunctionComponent} from 'react';
import {TabHome, TabOther} from 'modules/personalize/ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import EmptyView from '../EmptyView';

export interface DataTab {
  key: string;
  component: FunctionComponent<MainStackScreenProps<any> | any>;
  activeIcon: ImageSourcePropType;
  icon: ImageSourcePropType;
  name: string;
}

const tabs: Array<DataTab> = [
  {
    key: BottomMainConfig.Home,
    component: TabHome,
    activeIcon: tab_home_active,
    icon: tab_home,
    name: 'Trang chủ',
  },
  {
    key: BottomMainConfig.Search,
    component: EmptyView,
    activeIcon: tab_product_active,
    icon: tab_product,
    name: 'Tìm kiếm',
  },
  {
    key: BottomMainConfig.Other,
    component: TabOther,
    activeIcon: tab_other_active,
    icon: tab_other,
    name: 'Thêm',
  },
];

export default tabs;
