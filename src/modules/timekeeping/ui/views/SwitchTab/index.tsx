import React, {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {TimekeepingTabButton} from 'modules/timekeeping/enums/TimekeepingTabButton';

interface Props {
  firstTabTitle: string;
  secondTabTitle: string;
  firstTabValue: TimekeepingTabButton;
  secondTabValue: TimekeepingTabButton;
  onChangeTab: (type: TimekeepingTabButton) => void;
  activeTab: TimekeepingTabButton;
}

const SwitchTab: FC<Props> = (props: Props) => {
  const {
    firstTabTitle,
    secondTabTitle,
    firstTabValue,
    secondTabValue,
    onChangeTab,
    activeTab,
  } = props;
  const onPressTab = (value: TimekeepingTabButton) => {
    onChangeTab(value);
  };
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => onPressTab(firstTabValue)}
        style={[
          style.tab,
          style.tabLeft,
          activeTab === firstTabValue && style.selected,
        ]}>
        <Typography
          textType="medium"
          text={firstTabTitle}
          color={
            activeTab === firstTabValue
              ? colors.base.white
              : colors.primary.o500
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressTab(secondTabValue)}
        style={[style.tab, activeTab === secondTabValue && style.selected]}>
        <Typography
          textType="medium"
          text={secondTabTitle}
          color={
            activeTab === secondTabValue
              ? colors.base.white
              : colors.primary.o500
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default SwitchTab;
