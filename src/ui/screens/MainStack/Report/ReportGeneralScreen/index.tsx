import CTLayout from 'components/CTLayout';
import CTStatusBar from 'components/CTStatusBar';
import {MainRouteConfig} from 'config/RouteConfig';
import React from 'react';
import {FC} from 'react';
import {View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import ReportGeneralMenu, {DataMenuProps} from './ReportGeneralMenu';
import ReportMenuItem from './ReportMenuItem';
import {ReportGeneralStyle} from './style';

type Props = MainStackScreenProps<'ReportGeneral'>;

const ReportGeneralSceen: FC<Props> = ({navigation}) => {
  const handleMenuItemPress = (item: DataMenuProps) => {
    switch (item.id) {
      case 1:
        navigation.navigate(MainRouteConfig.ReportRetail, {});
        break;
      default:
        navigation.navigate(MainRouteConfig.Feature);
        break;
    }
  };

  return (
    <CTLayout.Body>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack title="Báo cáo chung" />
      <CTLayout.Body>
        <View style={ReportGeneralStyle.body}>
          {ReportGeneralMenu.map(e => {
            return (
              <ReportMenuItem
                item={e}
                key={e.id}
                handleMenuItemPress={handleMenuItemPress}
                separator
              />
            );
          })}
        </View>
      </CTLayout.Body>
    </CTLayout.Body>
  );
};

export default ReportGeneralSceen;
