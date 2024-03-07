import React, {useMemo, useState} from 'react';
import {Layout} from 'common-ui';
import {View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {style} from './style';
import SwitchTab from 'modules/timekeeping/ui/views/SwitchTab';
import {TimekeepingTabButton} from 'modules/timekeeping/enums/TimekeepingTabButton';
import TimeSheetTab from 'modules/timekeeping/ui/screens/TimeSheetScreen/tabs/TimeSheetTab';
import StatisticalTab from 'modules/timekeeping/ui/screens/TimeSheetScreen/tabs/StatisticalTab';

type Props = MainStackScreenProps<'TimeSheet'>;

const TimeSheetScreen: React.FC<Props> = ({}) => {
  const [tab, setTab] = useState<TimekeepingTabButton>(
    TimekeepingTabButton.timekeeping,
  );

  const onChangeTab = (tabSelect: TimekeepingTabButton) => {
    setTab(tabSelect);
  };
  const renderComponentTab = useMemo(() => {
    if (tab === TimekeepingTabButton.statistical) {
      return <StatisticalTab />;
    } else {
      return <TimeSheetTab />;
    }
  }, [tab]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.ScreenHeaderBack title="Chấm công định vị" />
        <View style={style.tab}>
          <SwitchTab
            firstTabTitle="Chấm công GPS"
            secondTabTitle="Thống kê"
            firstTabValue={TimekeepingTabButton.timekeeping}
            secondTabValue={TimekeepingTabButton.statistical}
            onChangeTab={onChangeTab}
            activeTab={tab}
          />
        </View>
        {renderComponentTab}
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default TimeSheetScreen;
