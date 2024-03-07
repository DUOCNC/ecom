/*
 * Create By: Được Nguyễn Cố
 * Version: 1.0.0
 * Module: App
 */
import {MainStore} from 'reduxs/MainStore';
import React from 'react';
import {Provider} from 'react-redux';
import MainUi from 'ui/MainUI';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeStyle} from 'assets/theme';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales.VN = {
  monthNames: [
    'Tháng một',
    'Tháng hai',
    'Tháng ba',
    'Tháng bốn',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai',
  ],
  monthNamesShort: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 7', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};

LocaleConfig.defaultLocale = 'VN';

const App: React.FC = () => {
  return (
    <Provider store={MainStore}>
      <GestureHandlerRootView style={ThemeStyle.container}>
          <MainUi />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
