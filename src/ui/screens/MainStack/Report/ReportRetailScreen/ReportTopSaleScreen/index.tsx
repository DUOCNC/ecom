import {Colors} from 'assets/colors';
import {
  bg_empty,
  ic_attention,
  ic_customer,
  ic_information,
  ic_money1,
  ic_product_store,
  ic_rank1,
  ic_rank2,
  ic_rank3,
  ic_rp_down,
  ic_rp_up,
} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {NumberUtils} from 'common';
import {Font} from 'components/Base/Text/enums';
import CTLayout from 'components/CTLayout';
import CTRbSheet from 'components/CTRbSheet';
import EmptyState from 'components/CTScreen/EmptyState';
import CTStatusBar from 'components/CTStatusBar';
import CTTypography from 'components/CTTypography';
import {ReportBestSale} from 'model/dto/ReportService/ReportDto';
import {ReportQuery} from 'model/query/ReportQuery';
import React, {
  createRef,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BehaviorSubject} from 'rxjs';
import {
  getReportRetailDetailApi,
  getReportTopSaleApi,
} from 'services/ReportService/ReportApi';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {normalize} from 'utils/DimensionsUtils';
import {showError} from 'utils/ToastUtils';
import {
  EnumReportSaleType,
  EReportTabButton,
  ReportViewType,
} from '../../ReportConfig';
import ReportTabButton from '../TabButton';
import BSReportTopInfo from './BSReportTopInfo';
import {Styles} from './style';
import TopSaleItem from './TopSaleItem';
import {useAuth} from 'providers/contexts/AuthContext';
import ReportRetailFilterFull from '../ReportRetailFilterFull';

export const ValueRankCom: React.FC<{
  text: string;
  color: string;
  activeTab: number;
}> = ({text, color, activeTab}) => {
  return (
    <View style={Styles.rankValue}>
      <CTTypography.Text
        text={text}
        font={Font.Medium}
        style={{color: color}}
        level="2"
      />
      <Image
        source={
          activeTab !== EReportTabButton.customer ? ic_money1 : ic_customer
        }
        style={[
          {tintColor: color, marginLeft: normalize(2)},
          activeTab === EReportTabButton.customer && Styles.icCustomer,
        ]}
      />
    </View>
  );
};

interface TopSale {
  fullName: string;
  value: string;
}

type Props = MainStackScreenProps<'ReportTopSale'>;
const ReportTopSaleScreen: FC<Props> = ({route}) => {
  const [activeTab, setActiveTab] = useState<number>(EReportTabButton.revenue);
  const [loadSale, setLoadSale] = useState<boolean>(false);
  const [sales, setSales] = useState<Array<ReportBestSale>>([]);
  const {type, params} = route.params;
  const [isRefreshing, setRefreshing] = useState(false);
  const [loadTrigger] = useState(() => new BehaviorSubject<void>(undefined));
  const [firstLoad, setFirstLoad] = useState(true);
  const [growth, setGrowth] = useState<number | undefined>(0);
  const [totalStr, setTotalStr] = useState<string>();
  const bsStoreRef = createRef<RBSheet>();
  const {locationSelected, allLocations, locations} = useAuth();
  const [loadingGrowth, setLoadingGrowth] = useState<boolean>(false);
  const [salesTop, setSalesTop] = useState<Array<TopSale>>();
  const scrollRef = useRef<ScrollView>(null);

  const storeView = useMemo(() => {
    let storeName = locationSelected.locationName;
    if (locationSelected.locationId !== -1) {
      return (
        <CTTypography.Text level="2" font={Font.Medium} text={storeName} />
      );
    }
    if (
      locationSelected.locationId === -1 &&
      locations.length === allLocations.length
    ) {
      return (
        <CTTypography.Text level="2" font={Font.Medium} text={storeName} />
      );
    }
    if (locations.length > 1) {
      return (
        <View style={Styles.row}>
          <CTTypography.Text
            level="2"
            font={Font.Medium}
            text={`${locations.length} cửa hàng`}
          />
          <TouchableOpacity
            onPress={() => {
              bsStoreRef.current?.open();
            }}>
            <Image source={ic_information} style={{tintColor: '#5858b6'}} />
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }, [
    allLocations.length,
    bsStoreRef,
    locationSelected.locationId,
    locationSelected.locationName,
    locations.length,
  ]);
  const queryParam = useMemo(() => {
    let query: ReportQuery = {};
    if (params && params) {
      query = {...params};
    }
    return query;
  }, [params]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTrigger.next();
    new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
      setRefreshing(false),
    );
  };

  const getData = (
    param: ReportQuery,
    typeReport: string,
    viewType: string,
    tab: number,
  ) => {
    setLoadSale(true);
    getReportTopSaleApi(
      param,
      tab,
      typeReport,
      viewType,
      (sum, data) => {
        if (data && data.length > 0) {
          const topSales: Array<TopSale> = data.slice(0, 3).map(e => {
            let value = `${NumberUtils.getAmountSymbol(e.totalSales)}`;
            switch (tab) {
              case EReportTabButton.customer:
                value = `${e.customers}`;
                break;
              case EReportTabButton.average:
                value = `${NumberUtils.getAmountSymbol(e.averageOrderValue)}`;
                break;
            }
            return {
              fullName: e.assigneeName,
              value: value,
            };
          });
          setSalesTop(topSales ?? []);
          setSales(data);
        } else {
          setSales([]);
          setSalesTop([]);
        }
      },
      errors => {
        errors.map(e => showError(e));
      },
      () => setLoadSale(false),
    );
  };

  const getReportRetailDetailData = (
    query: ReportQuery,
    tab: number,
    viewType: string,
  ) => {
    setLoadingGrowth(true);
    getReportRetailDetailApi(
      query,
      tab,
      viewType,
      type,
      (value, rate) => {
        setTotalStr(value);
        setGrowth(rate);
      },
      () => {
        setTotalStr('0');
        setGrowth(0);
      },
      () => {
        setLoadingGrowth(false);
      },
    );
  };

  const handleChangeParam = useCallback(
    (query: ReportQuery, viewType: string) => {
      if (!firstLoad) {
        getData(query, type, viewType, activeTab);
        getReportRetailDetailData(query, activeTab, viewType);
      }
    },
    [firstLoad, type, activeTab],
  );

  useEffect(() => {
    if (firstLoad) {
      getData(queryParam, type, ReportViewType.day, activeTab);
    }
    setFirstLoad(false);
  }, [queryParam, type, firstLoad, activeTab]);

  const rateText = useMemo(() => {
    if (!growth) {
      return '';
    }
    return `${Math.abs(growth).toFixed(1)}%`;
  }, [growth]);

  const storeViewType = useMemo(() => {
    if (activeTab === EReportTabButton.customer) {
      return 'Tổng số khách mua';
    }
    if (activeTab === EReportTabButton.average) {
      return 'GTTB/đơn';
    }
    return 'Tổng doanh thu';
  }, [activeTab]);

  return (
    <CTLayout.Container disableHideKeyboardOnPress>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack
        style={ThemeStyle.shadowHeader}
        title={`${
          type === EnumReportSaleType.assignee
            ? 'Báo cáo theo CGTV'
            : 'Báo cáo theo thu ngân'
        }`}
        bottom={
          <View style={[Styles.tabButton]}>
            <ReportTabButton idActive={activeTab} onPress={setActiveTab} />
          </View>
        }
      />
      <Animated.View style={Styles.layout}>
        <CTLayout.Body>
          <Animated.ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            <View style={Styles.container}>
              <View style={Styles.content}>
                <View style={Styles.param}>
                  <ReportRetailFilterFull
                    onPress={handleChangeParam}
                    pDate={queryParam?.view_date}
                    pViewType={queryParam.view_type}
                  />
                </View>
                {loadSale ? (
                  <ActivityIndicator size="large" />
                ) : sales && sales.length === 0 ? (
                  <View style={Styles.empty}>
                    <EmptyState
                      title="Không có dữ liệu"
                      subTitle="Bạn vui lòng quay lại sau!"
                      icon={bg_empty}
                    />
                  </View>
                ) : (
                  <>
                    <View style={Styles.store}>
                      <Image
                        style={Styles.iconStore}
                        source={ic_product_store}
                      />
                      <View style={Styles.storeRight}>
                        <View style={Styles.storeName}>{storeView}</View>
                        <View style={Styles.storeViewType}>
                          <CTTypography.Text
                            level="3"
                            text={storeViewType}
                            style={Styles.subText}
                            font={Font.Medium}
                          />
                        </View>
                        <View style={Styles.storeValue}>
                          <CTTypography.Text
                            level="2"
                            style={{color: Colors.Primary}}
                            font={Font.Medium}
                            text={totalStr}
                          />
                          {loadingGrowth ? (
                            <ActivityIndicator size="small" />
                          ) : growth ? (
                            growth >= 0 ? (
                              <View
                                style={[
                                  Styles.storeGrowth,
                                  Styles.storeGrowth.tagUp,
                                ]}>
                                <Image source={ic_rp_up} />
                                <CTTypography.Text
                                  level="4"
                                  style={Styles.growth.up}
                                  text={rateText}
                                />
                              </View>
                            ) : (
                              <View
                                style={[
                                  Styles.storeGrowth,
                                  Styles.storeGrowth.tagDown,
                                ]}>
                                <Image source={ic_rp_down} />
                                <View>
                                  <CTTypography.Text
                                    level="4"
                                    style={Styles.growth.down}
                                    text={rateText}
                                  />
                                </View>
                              </View>
                            )
                          ) : (
                            <Image source={ic_attention} />
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={Styles.title}>
                      <CTTypography.Text
                        text={`XẾP HẠNG ${
                          type === EnumReportSaleType.assignee
                            ? 'CGTV'
                            : 'THU NGÂN'
                        }`}
                        font={Font.Medium}
                        level="2"
                      />
                      <View style={Styles.countEmployee}>
                        <CTTypography.Text
                          level="4"
                          text={`${sales.length} Nhân viên`}
                          style={Styles.countEmpText}
                        />
                      </View>
                    </View>
                    <View style={Styles.rank}>
                      <View style={[Styles.rank.rank2, Styles.rankColumn]}>
                        <Image source={ic_rank2} />
                        <View style={[Styles.rank2Bottom, Styles.rankBottom]}>
                          <CTTypography.Text
                            text={
                              salesTop && salesTop[1] && salesTop[1].fullName
                            }
                            level="4"
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={[Styles.rankText, {color: Colors.White}]}
                          />
                          <ValueRankCom
                            text={
                              salesTop && salesTop[1] ? salesTop[1].value : ''
                            }
                            color="#2F54EB"
                            activeTab={activeTab}
                          />
                        </View>
                      </View>
                      <View style={[Styles.rank.rank1, Styles.rankColumn]}>
                        <Image source={ic_rank1} />
                        <View style={[Styles.rank1Bottom, Styles.rankBottom]}>
                          <CTTypography.Text
                            text={
                              salesTop && salesTop[0]
                                ? salesTop[0].fullName
                                : ''
                            }
                            level="4"
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={[Styles.rankText, Styles.rank1Text]}
                          />
                          <ValueRankCom
                            activeTab={activeTab}
                            text={
                              salesTop && salesTop[0] ? salesTop[0].value : ''
                            }
                            color="#FAAD14"
                          />
                        </View>
                      </View>
                      <View style={[Styles.rank.rank3, Styles.rankColumn]}>
                        <Image source={ic_rank3} />
                        <View style={[Styles.rank3Bottom, Styles.rankBottom]}>
                          <CTTypography.Text
                            text={
                              salesTop && salesTop[2]
                                ? salesTop[2].fullName
                                : ''
                            }
                            level="4"
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={[Styles.rankText, {color: Colors.White}]}
                          />
                          <ValueRankCom
                            activeTab={activeTab}
                            text={
                              salesTop && salesTop[2] ? salesTop[2].value : ''
                            }
                            color="#793CDD"
                          />
                        </View>
                      </View>
                    </View>
                    <View style={Styles.list}>
                      {sales && sales.length > 0 && (
                        <TopSaleItem sales={sales} activeTab={activeTab} />
                      )}
                    </View>
                    <CTRbSheet
                      dragFromTopOnly
                      closeOnDragDown
                      height={500}
                      ref={bsStoreRef}>
                      <BSReportTopInfo
                        onPress={() => {
                          bsStoreRef.current?.close();
                        }}
                      />
                    </CTRbSheet>
                  </>
                )}
              </View>
            </View>
          </Animated.ScrollView>
        </CTLayout.Body>
      </Animated.View>
    </CTLayout.Container>
  );
};

export default ReportTopSaleScreen;
