import React, {useEffect, useState} from 'react';
import {Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {Platform, View} from 'react-native';
import {style} from './style';
import {timekeepingService} from 'modules/timekeeping/services';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';

const BoxRealTimeView: React.FC<{}> = () => {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTimeFromServer = async () => {
      const timeDate = await timekeepingService.getTimeFromServer();
      setTime(timeDate);
      setLoading(false);
    };
    getTimeFromServer();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={style.timeNow}>
      <Layout.Loading loading={loading} size="small">
        <Typography
          style={style.textTimeNow}
          color={colors.secondary.o700}
          text={
            Platform.OS === 'android'
              ? moment(time).utc().format(FormatDatePattern['HH:mm:ss'])
              : moment(time).format(FormatDatePattern['HH:mm:ss'])
          }
        />
      </Layout.Loading>
    </View>
  );
};

export default BoxRealTimeView;
