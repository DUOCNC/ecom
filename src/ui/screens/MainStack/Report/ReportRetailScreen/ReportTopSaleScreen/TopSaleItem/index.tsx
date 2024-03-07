import {ic_arrow, ic_rank1_sale, ic_rank2, ic_rank3} from 'assets/images';
import CTFLastList from 'components/CTFlatList';
import CTTypography from 'components/CTTypography';
import _ from 'lodash';
import {
  ReportBestSale,
  ReportBestSaleFullDto,
  ReportBestSaleItemView,
} from 'model/dto/ReportService/ReportDto';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageURISource,
  LayoutAnimation,
  Platform,
  ScrollView,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import NumberUtils from 'utils/NumberUtils';
import {EReportTabButton, SubItemActiveTabConfig} from '../../../ReportConfig';
import {Styles} from './style';

export interface Props {
  sales: Array<ReportBestSale>;
  activeTab: number;
}

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

const getDataSubActiveTabConfig = (activeTab: number, item: ReportBestSale) => {
  const subActiveTab = SubItemActiveTabConfig.find(e => e.tab === activeTab);
  let reportBestSaleItemView: Array<ReportBestSaleItemView> = [];
  if (subActiveTab) {
    if (subActiveTab.tab === activeTab) {
      reportBestSaleItemView = [];
      for (let i = 0; i < subActiveTab.configs.length; i++) {
        const e = subActiveTab.configs[i];
        let value = item[e.column as keyof typeof item];
        value = value ? (value as number) : 0;
        reportBestSaleItemView.push({
          key: e.key,
          value:
            e.type === 'number'
              ? NumberUtils.formatNumber(value)
              : NumberUtils.formatCurrency(value),
        });
      }
    }
  }

  return reportBestSaleItemView;
};

const SubItem = (items: Array<ReportBestSaleItemView>) => {
  return (
    <View style={Styles.sub}>
      <View style={Styles.subItem}>
        <CTTypography.Text
          style={Styles.subItemText}
          text={items[0].key}
          level="4"
        />
        <CTTypography.Text text={items[0].value} level="4" />
      </View>
      <View style={Styles.subItem}>
        <CTTypography.Text
          style={Styles.subItemText}
          text={items[1].key}
          level="4"
        />
        <CTTypography.Text text={items[1].value} level="4" />
      </View>
      <View style={Styles.subItem}>
        <CTTypography.Text
          style={Styles.subItemText}
          text={items[2].key}
          level="4"
        />
        <CTTypography.Text
          style={Styles.text}
          text={items[2].value}
          level="4"
        />
      </View>
    </View>
  );
};

const TopSaleItem: FC<Props> = (props: Props) => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const [multiSelect, setMultiSelect] = useState(false);
  const {sales, activeTab} = props;
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

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let array = _.cloneDeep(lstSource);
    if (multiSelect) {
      array[index].isExpanded = !array[index].isExpanded;
    } else {
      array.map((value, placeIndex) => {
        placeIndex === index
          ? (array[placeIndex].isExpanded = !array[placeIndex].isExpanded)
          : (array[placeIndex].isExpanded = false);
      });
    }
    setLstSource(array);
  };

  const renderItem = (item: ReportBestSaleFullDto, index: number) => {
    return (
      <View
        key={index}
        style={{
          width: Dimensions.get('screen').width - 36,
        }}>
        <TouchableOpacity
          onPress={() => {
            updateLayout(index);
          }}>
          <View style={Styles.item}>
            <View style={Styles.left}>
              <View
                style={[
                  Styles.icon,
                  index >= 3 && {
                    backgroundColor: index < 10 ? getBgColor(index) : undefined,
                  },
                ]}>
                {index < 3 ? (
                  <Image source={getIcSource(index)} style={Styles.iconTop} />
                ) : (
                  <CTTypography.Text
                    text={`${index + 1}`}
                    level={index + 1 > 999 ? '4' : '3'}
                    style={index < 10 ? Styles.iconText : Styles.iconText1}
                  />
                )}
              </View>
              <View>
                <CTTypography.Text
                  text={item.item.assigneeName}
                  style={Styles.text}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                />
                <CTTypography.Text
                  text={item.item.assigneeCode}
                  style={Styles.subText}
                  level="4"
                />
              </View>
            </View>
            <View style={Styles.right}>
              <View>
                <CTTypography.Text
                  style={[Styles.text, Styles.rightText]}
                  text={item.totalView}
                />
              </View>
              <View style={Styles.iconArrowSku}>
                <Image
                  source={ic_arrow}
                  style={item.isExpanded && Styles.transformArrow}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              overflow: 'hidden',
              height: item.isExpanded ? undefined : 0,
            }}>
            {item.subItems && item.subItems.length > 0 && (
              <View style={Styles.sub}>{SubItem(item.subItems)}</View>
            )}
          </View>
        </TouchableOpacity>
        <View style={Styles.line} />
      </View>
    );
  };

  const dataSource = useMemo(() => {
    let reportBestSaleFullDto: Array<ReportBestSaleFullDto> = [];
    if (lstSource && lstSource.length > 0) {
      reportBestSaleFullDto = lstSource.map((e: ReportBestSaleFullDto) => {
        e.totalView = NumberUtils.formatCurrency(e.totalSales);
        if (activeTab === EReportTabButton.customer) {
          e.totalView = e.item.customers?.toString();
        }
        if (activeTab === EReportTabButton.average) {
          e.totalView = NumberUtils.formatCurrency(e.item.averageOrderValue);
        }
        e.subItems = getDataSubActiveTabConfig(activeTab, e.item);
        return e;
      });
    }
    return reportBestSaleFullDto;
  }, [activeTab, lstSource]);

  return (
    <View>
      <ScrollView scrollEnabled={false} horizontal={true}>
        <CTFLastList
          scrollEnabled={false}
          data={dataSource}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => {
            return renderItem(item, index);
          }}
          disableRefresh={true}
        />
      </ScrollView>
    </View>
  );
};

export default TopSaleItem;
