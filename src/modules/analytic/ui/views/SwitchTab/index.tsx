import React, {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {CRVViewType} from 'modules/analytic/config/ReportConfig';

interface Props {
  firstTabTitle: string;
  secondTabTitle: string;
  firstTabValue: CRVViewType;
  secondTabValue: CRVViewType;
  onChangeCRVType: (type: CRVViewType) => void;
}

const SwitchTab: FC<Props> = (props: Props) => {
  const {
    firstTabTitle,
    secondTabTitle,
    firstTabValue,
    secondTabValue,
    onChangeCRVType,
  } = props;
  const [tabSelect, setTabSelect] = useState<string>(firstTabValue);
  const onPressTab = (value: CRVViewType) => {
    setTabSelect(value);
    onChangeCRVType(value);
  };
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() => onPressTab(firstTabValue)}
        style={[
          style.tab,
          style.tabLeft,
          tabSelect === firstTabValue && style.selected,
        ]}>
        <Typography
          type="h5"
          textType="medium"
          text={firstTabTitle}
          color={
            tabSelect === firstTabValue
              ? colors.base.white
              : colors.primary.o400
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressTab(secondTabValue)}
        style={[style.tab, tabSelect === secondTabValue && style.selected]}>
        <Typography
          type="h5"
          textType="medium"
          text={secondTabTitle}
          color={
            tabSelect === secondTabValue
              ? colors.base.white
              : colors.primary.o400
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default SwitchTab;
