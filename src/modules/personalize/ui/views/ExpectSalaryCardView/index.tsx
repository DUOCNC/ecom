import React, {useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Typography} from 'common-ui';
import style from './style';
import {ic_arrow_up} from 'assets/images';
import {colors} from 'assets/v2';
import Collapsible from 'react-native-collapsible';
import {MetaDataEntity} from 'modules/personalize/models/entities/PersonnelEntity';

interface Props {
  title: string;
  value: string;
  childData: Array<MetaDataEntity>;
}

const ExpectSalaryCardView: React.FC<Props> = ({title, value, childData}) => {
  const [collapsed, setCollapsed] = useState(true);
  const onPress = () => {
    if (childData && childData.length > 0) {
      setCollapsed(!collapsed);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={style.card}>
        <View style={style.title}>
          <Typography style={style.titleTxt} textType="medium" text={title} />
          {childData && childData.length > 0 && (
            <Image
              style={[style.iconArrow, !collapsed && style.iconArrowTransform]}
              source={ic_arrow_up}
            />
          )}
        </View>
        <Typography
          style={style.priceTxt}
          textType="medium"
          type="h2"
          text={value}
          color={colors.primary.o500}
        />
        <Collapsible collapsed={collapsed}>
          <View style={childData.length > 0 && style.content}>
            {childData &&
              childData.length > 0 &&
              childData.map((item, index) => {
                return (
                  <View key={index} style={style.row}>
                    <Typography
                      text={item.getName()}
                      style={style.childTitle}
                    />
                    <Typography textType="medium" text={item.getValue()} />
                  </View>
                );
              })}
          </View>
        </Collapsible>
      </TouchableOpacity>
    </View>
  );
};

export default ExpectSalaryCardView;
