import {bg_empty_employee} from 'assets/images';
import EmptyState from 'components/CTScreen/EmptyState';
import CTTypography from 'components/CTTypography';
import _ from 'lodash';
import {
  ReportBestSale,
  ReportBestSaleFullDto,
} from 'model/dto/ReportService/ReportDto';
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import NumberUtils from 'utils/NumberUtils';
import {BestSalerStyle} from './style';

export interface Props {
  sales: Array<ReportBestSale>;
  loadingSale: boolean;
}
const BestSeller: FC<Props> = (props: Props) => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [multiSelect, setMultiSelect] = useState(false);
  const {sales, loadingSale} = props;
  const [lstSource, setLstSource] = useState<Array<ReportBestSaleFullDto>>([]);

  useEffect(() => {
    let arr: Array<ReportBestSaleFullDto> = [];
    if (sales && sales.length > 0) {
      arr = sales.map(e => {
        return {
          totalSales: e.totalSales,
          isExpanded: false,
          item: e,
          key: e.assigneeCode,
        };
      });
    }
    setLstSource(arr);
  }, [sales]);

  const getBgColor = (top: number) => {
    let color = '#9595C3';
    switch (top) {
      case 0:
        color = '#EE4747';
        break;
      case 1:
        color = '#FFCC0B';
        break;
      case 2:
        color = '#0DB473';
        break;
      case 3:
        color = '#6A6AAA';
        break;
    }
    return color;
  };

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let array = _.cloneDeep(lstSource);
    if (multiSelect) {
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      array.map((value, placeindex) => {
        placeindex === index
          ? (array[placeindex].isExpanded = !array[placeindex].isExpanded)
          : (array[placeindex].isExpanded = false);
      });
    }
    setLstSource(array);
  };

  const renderItem = (item: ReportBestSaleFullDto, index: number) => {
    // if (item.isExpanded) {
    //   setLayoutHeight(undefined);
    // } else {
    //   setLayoutHeight(0);
    // }

    return (
      <View key={item.key}>
        <TouchableOpacity
          onPress={() => {
            updateLayout(index);
          }}>
          <View style={BestSalerStyle.item}>
            <View style={BestSalerStyle.left}>
              <View
                style={[
                  BestSalerStyle.icon,
                  {backgroundColor: getBgColor(index)},
                ]}>
                <CTTypography.Text
                  text={`${index + 1}`}
                  level="1"
                  style={BestSalerStyle.iconText}
                />
              </View>
              <View style={{flex: 1}}>
                <CTTypography.Text
                  text={item.item.assigneeName}
                  style={BestSalerStyle.text}
                  level="2"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                />
                <CTTypography.Text
                  text={item.item.assigneeCode}
                  style={BestSalerStyle.subText}
                />
              </View>
            </View>
            <View style={BestSalerStyle.right}>
              <CTTypography.Text
                style={[BestSalerStyle.text, BestSalerStyle.rightText]}
                text={NumberUtils.formatCurrency(item.totalSales)}
                level="2"
              />
            </View>
          </View>
          <View
            style={{
              overflow: 'hidden',
              height: item.isExpanded ? undefined : 0,
            }}>
            <View style={BestSalerStyle.sub}>
              <View style={BestSalerStyle.subItem}>
                <CTTypography.Text
                  style={BestSalerStyle.subItemText}
                  text="Giá trị trung bình đơn"
                  level="3"
                />
                <CTTypography.Text
                  text={NumberUtils.formatCurrency(item.item.averageOrderValue)}
                  level="3"
                />
              </View>
              <View style={BestSalerStyle.subItem}>
                <CTTypography.Text
                  style={BestSalerStyle.subItemText}
                  text="Số lượng đơn bán"
                  level="3"
                />
                <CTTypography.Text
                  text={NumberUtils.formatNumber(item.item.orderCount)}
                  level="3"
                />
              </View>
              <View style={BestSalerStyle.subItem}>
                <CTTypography.Text
                  style={BestSalerStyle.subItemText}
                  text="Số lượng đơn trả"
                  level="3"
                />
                <CTTypography.Text
                  style={BestSalerStyle.text}
                  text={NumberUtils.formatNumber(item.item.returnCount)}
                  level="3"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {index < sales.length - 1 && <View style={BestSalerStyle.line} />}
      </View>
    );
  };

  return (
    <View style={BestSalerStyle.container}>
      {loadingSale ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : lstSource && lstSource.length > 0 ? (
        lstSource.map((e: ReportBestSaleFullDto, index: number) =>
          renderItem(e, index),
        )
      ) : (
        <View style={BestSalerStyle.empty}>
          <EmptyState
            title="Không có nhân viên"
            subTitle="Không có xếp hạng nhân viên nào trong thời tian này. Vui lòng thử lại sau"
            icon={bg_empty_employee}
          />
        </View>
      )}
    </View>
  );
};

export default BestSeller;
