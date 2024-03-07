import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import moment, {Moment} from 'moment';
import style from './style';
import {ic_double_left, ic_double_right} from 'assets/images';
import {Typography} from 'common-ui';
import _ from 'lodash';


interface WeekSelectorProps {
  onChangeWeek: (startWeek: Moment, endWeek: Moment) => void;
}

const WeekSelectorView = ({onChangeWeek}: WeekSelectorProps) => {
  const [startWeek, setStartWeek] = useState(moment().startOf('isoWeek'));
  const [endWeek, setEndWeek] = useState(moment().endOf('isoWeek'));

  const onPressPrevious = () => {
    let newWeekStart = _.cloneDeep(
      startWeek.subtract(1, 'weeks').startOf('isoWeek'),
    );
    let newWeekEnd = _.cloneDeep(endWeek.subtract(1, 'weeks').endOf('isoWeek'));
    setStartWeek(newWeekStart);
    setEndWeek(newWeekEnd);
    onChangeWeek(newWeekStart, newWeekEnd);
  };
  const onPressNext = () => {
    let newWeekStart = _.cloneDeep(
      startWeek.add(1, 'weeks').startOf('isoWeek'),
    );
    let newWeekEnd = _.cloneDeep(endWeek.add(1, 'weeks').endOf('isoWeek'));
    setStartWeek(newWeekStart);
    setEndWeek(newWeekEnd);
    onChangeWeek(newWeekStart, newWeekEnd);
  };
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPressPrevious}>
        <Image source={ic_double_left} />
      </TouchableOpacity>
      <Typography
        text={`${startWeek.format('DD/MM')} - ${endWeek.format('DD/MM')}`}
      />

      <TouchableOpacity onPress={onPressNext}>
        <Image source={ic_double_right} />
      </TouchableOpacity>
    </View>
  );
};

export default WeekSelectorView;
