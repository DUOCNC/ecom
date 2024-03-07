import ReportRankEntity from 'modules/analytic/models/entities/ReportRankEntity';
import React, {FC} from 'react';
import {Image, ImageURISource, TouchableOpacity, View} from 'react-native';
import {style} from './style';
import {Typography} from 'common-ui';
import {ic_arrow, ic_rank1_sale, ic_rank2, ic_rank3} from 'assets/images';
import {colors} from 'assets/v2';

interface props {
  data: Array<ReportRankEntity>;
  activeTab: string;
  onPress?: (viewName: string) => void;
}

const getBgColor = (top: number) => {
  let color = '#8080DA';
  switch (top) {
    case 3:
      color = '#EE4747';
      break;
    case 4:
      color = '#FDB022';
      break;
  }
  return color;
};

const getIcSource = (index: number) => {
  let icon: ImageURISource = ic_rank1_sale;
  if (index === 1) {
    icon = ic_rank2;
  }
  if (index === 2) {
    icon = ic_rank3;
  }
  return icon;
};

const EmulationItem: FC<{
  item: ReportRankEntity;
  index: number;
  activeTab: string;
  onPress?: (viewName: string) => void;
}> = ({item, index, activeTab, onPress}) => {
  return (
    <TouchableOpacity
      disabled={onPress ? false : true}
      onPress={() => {
        onPress && onPress(item.getName());
      }}>
      <View style={style.item}>
        <View style={style.left}>
          <View
            style={[
              style.icon,
              index >= 3 && {
                backgroundColor: index < 10 ? getBgColor(index) : undefined,
              },
            ]}>
            {index < 3 ? (
              <Image source={getIcSource(index)} style={style.iconTop} />
            ) : (
              <Typography
                text={`${index + 1}`}
                type={index + 1 > 999 ? 'h4' : 'h3'}
                color={index < 10 ? colors.base.white : colors.secondary.o500}
              />
            )}
          </View>
          <Typography
            text={item.getName()}
            color={colors.secondary.o900}
            ellipsizeMode="tail"
            numberOfLines={2}
            style={style.name}
          />
        </View>
        <View style={style.right}>
          <Typography
            color={colors.primary.o500}
            text={item.getValueByActiveTab(activeTab)}
          />
          {onPress && (
            <View style={style.iconArrow}>
              <Image source={ic_arrow} />
            </View>
          )}
        </View>
      </View>
      <View style={style.line} />
    </TouchableOpacity>
  );
};

const EmulationDetailView: FC<props> = ({data, activeTab, onPress}) => {
  return (
    <React.Fragment>
      {data.map((item, index: number) => (
        <EmulationItem
          key={index}
          item={item}
          index={index}
          activeTab={activeTab}
          onPress={onPress}
        />
      ))}
    </React.Fragment>
  );
};

export default EmulationDetailView;
