import React from 'react';
import {Typography} from 'common-ui';
import {Image, View} from 'react-native';
import {style} from './style';
import {ic_attention, ic_circle_check} from 'assets/images';
import {CheckTimeEntity} from 'modules/timekeeping/models/entities/CheckTimeEntity';

const NearestCheckInView: React.FC<{data: Array<CheckTimeEntity>}> = ({
  data,
}) => {
  if (data.length === 0) {
    return (
      <View style={style.checkInNearest}>
        <View style={style.nearestLabel}>
          <Image source={ic_attention} />
          <Typography
            style={style.nearestText}
            text="Bạn chưa chấm công hôm nay"
          />
        </View>
      </View>
    );
  }
  if (data.length === 1) {
    return (
      <View style={style.checkInNearest} key={data[0].getTime()}>
        <View style={style.nearestLabel}>
          <Image source={ic_circle_check} />
          <Typography style={style.nearestText} text="Chốt đầu ngày" />
        </View>
        <View style={style.timeNearest}>
          <Typography text={data[0].getTime()} />
        </View>
      </View>
    );
  }
  return (
    <View>
      <View style={style.checkInNearest} key={data[data.length - 1].getTime()}>
        <View style={style.nearestLabel}>
          <Image source={ic_circle_check} />
          <Typography style={style.nearestText} text="Chốt đầu ngày" />
        </View>
        <View style={style.timeNearest}>
          <Typography text={data[data.length - 1].getTime()} />
        </View>
      </View>
      <View style={style.checkInNearest} key={data[0].getTime()}>
        <View style={style.nearestLabel}>
          <Image source={ic_circle_check} />
          <Typography style={style.nearestText} text="Chốt cuối ngày" />
        </View>
        <View style={style.timeNearest}>
          <Typography text={data[0].getTime()} />
        </View>
      </View>
    </View>
  );
};

export default NearestCheckInView;
