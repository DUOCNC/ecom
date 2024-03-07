import React, {useEffect, useState} from 'react';
import {ErrorType, Layout, Typography} from 'common-ui';
import {Image, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {ic_time} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ShiftEntity} from 'modules/timekeeping/models/entities';

type Props = MainStackScreenProps<'TimeSheetDetail'>;
const TimeSheetDetailScreen: React.FC<Props> = ({route}) => {
  const {workdayDateEntity} = route.params;
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!workdayDateEntity.getCheckin() && !workdayDateEntity.getCheckout()) {
      setError('NotfoundReport');
      setMsgError('');
    }
  }, [workdayDateEntity]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title={StringUtils.format(
          'Chấm công, ngày {0}',
          workdayDateEntity.getViewDate(),
        )}
      />
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.Error subTitle={msgError} error={error}>
          <View style={style.container}>
            <View style={[style.title, style.row]}>
              <View style={style.titleLeft}>
                <Image
                  source={ic_time}
                  style={[{tintColor: colors.blue.o500}, style.iconTime]}
                />
                <Typography
                  text="TỔNG SỐ GIỜ"
                  type="h3"
                  textType="medium"
                  style={style.textTitle}
                />
              </View>
              <View style={style.titleRight}>
                <Typography
                  text={workdayDateEntity.getCalWorkHour()}
                  textType="medium"
                  style={style.textTitle}
                />
              </View>
            </View>
            <View style={[style.row, style.timekeeping]}>
              <Typography text="Chấm công" color={colors.secondary.o500} />
              <View>
                <Typography
                  text={workdayDateEntity.getCheckin()}
                  textType="medium"
                />
              </View>
            </View>
            <View style={[style.row, style.fingerprint]}>
              <View>
                <Typography
                  text={workdayDateEntity.getCheckout()}
                  textType="medium"
                />
              </View>
            </View>
            <View style={[style.row, style.timeWorkHours]}>
              <View style={style.left}>
                <Typography text="Ca làm việc" color={colors.secondary.o500} />
              </View>
              <View style={style.right}>
                {workdayDateEntity
                  .getShifts()
                  .map((item: ShiftEntity, index: number) => {
                    return (
                      <Typography
                        text={StringUtils.format(
                          '{0} - {1}',
                          item.code,
                          item.name,
                        )}
                        ellipsizeMode="tail"
                        textType="medium"
                        numberOfLines={2}
                        style={index !== 0 && style.paddingTop8}
                      />
                    );
                  })}
              </View>
            </View>
          </View>
        </Layout.Error>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default TimeSheetDetailScreen;
