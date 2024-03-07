import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ErrorType, Layout, Typography} from 'common-ui';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {
  bg_start_search_customer,
  ic_user_blue_circle,
  icon_user,
} from 'assets/images';
import {colors} from 'assets/v2';
import CardSlotFeedback from 'modules/feedback/ui/views/CardSlotFeedback';
import {FeedbackEntity} from 'modules/feedback/models/entities';
import {feedbackService} from 'modules/feedback/services';
import {StatusesConfig} from 'modules/feedback/config/StatusConfig';
import {StatusConfig} from 'modules/feedback/models/config';
import {useAppDispatch} from 'hook';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {MainErrorType} from 'enums';
import {useAuth} from 'providers/contexts/AuthContext';
import {SourceId} from 'modules/feedback/enums/Source';
import {LotFeedbackEntity} from 'modules/feedback/models/entities/LotFeedbackEntity';
import {MainRouteConfig} from 'config/RouteConfig';
import {FeedbackStatus} from 'modules/feedback/enums';
import CTFLastList from 'components/CTFlatList';
import {AppConfig} from 'config/AppConfig';
import {Metadata} from 'common';
import {useFocusEffect} from '@react-navigation/native';
import CTRangeDatePicker from 'components/CTRangeDatePicker';
import DateUtilts from 'common/utils/DateUtilts';
import {AlignVerticalErrorEnum} from 'enums/MainErrorType';

type Props = MainStackScreenProps<'FeedbackRecord'>;

const FeedbackRecordScreen: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ErrorType | false>(false);
  const [message, setMessage] = useState<string>('');
  const [errCode, setErrCode] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {profile, locationSelected, locations} = useAuth();
  const [feedbackEntities, setFeedbackEntities] = useState<
    Array<FeedbackEntity>
  >([]);
  const [statues] = useState<Array<StatusConfig>>(StatusesConfig);
  const [selectTab, setSelectTab] = useState<StatusConfig>(StatusesConfig[0]);
  const [visitorReport, setVisitorReport] = useState<LotFeedbackEntity>(
    LotFeedbackEntity.createEmpty(),
  );
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const start = useMemo(() => {
    let startDate = new Date();
    if (route.params && route.params.firstDate) {
      startDate = route.params.firstDate;
    }
    startDate.setHours(0, 0, 0);
    return startDate;
  }, [route.params]);
  const end = useMemo(() => {
    let endDate = new Date();
    if (route.params && route.params.secondDate) {
      endDate = route.params.secondDate;
    }
    endDate.setHours(23, 59, 59);
    return endDate;
  }, [route.params]);
  const [firstDate, setFirstDate] = useState<Date>(start);
  const [secondDate, setSecondDate] = useState<Date>(end);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: AppConfig.MaxLimit,
    total: 0,
  });
  const storeIds = useMemo(() => {
    if (locationSelected.locationId === -1) {
      return profile?.locationIds.join(',');
    } else {
      return `${locationSelected.locationId}`;
    }
  }, [locationSelected.locationId, profile?.locationIds]);

  const storeIdsVisitor = useMemo(() => {
    if (locationSelected.locationId === -1) {
      return profile?.locationIds ?? [0];
    } else {
      return [locationSelected.locationId ?? 0];
    }
  }, [locationSelected.locationId, profile?.locationIds]);

  const handleSuccess = (fbEntities: Array<FeedbackEntity>, meta: Metadata) => {
    loadReportLotVisitor();
    setError(false);
    setMessage('');
    setErrCode(null);
    setFeedbackEntities(fbEntities);
    setMetadata(meta);
    dispatch(hideModal());
  };
  const handleError = (err: ErrorType | false, msg: string, errCode?: number) => {
    setMessage(msg);
    setError(err);
    if (errCode) {
      setErrCode(errCode);
    }
    setLoading(false);
    dispatch(hideModal());
  };

  const loadReportLotVisitor = () => {
    let paramsVisitor = {
      isStoreOnly: false,
      storeIds: storeIdsVisitor,
      positionId: profile?.positionId,
      createdAtFrom: DateUtilts.clearMillisecond(firstDate.toJSON()),
      createdAtTo: DateUtilts.clearMillisecond(secondDate.toJSON()),
    };
    feedbackService.getLotFeedback(
      paramsVisitor,
      (result: LotFeedbackEntity) => {
        setVisitorReport(result);
      },
      () => {},
      () => {},
      () => {
        setLoading(false);
      },
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (firstLoading) {
        setError(false);
        let status = selectTab.status;
        if (
          status === FeedbackStatus.ALL ||
          status === FeedbackStatus.DELETED
        ) {
          status = '';
        }
        const params = {
          status,
          advisorCode: profile?.code,
          storeIds,
          sourceId: SourceId.MOBILE,
          positionId: profile?.positionId,
          limit: AppConfig.MaxLimit,
          page: 1,
          createdAtFrom: DateUtilts.clearMillisecond(firstDate.toJSON()),
          createdAtTo: DateUtilts.clearMillisecond(secondDate.toJSON()),
          sortColumn: 'createdAt',
          sortType: 'desc',
        };

        feedbackService.getFeedbacks(
          {
            ...params,
          },
          handleSuccess,
          handleError,
          () => {
            setLoading(true);
          },
          () => {
            setFirstLoading(false);
          },
        );
      }
    }, [firstLoading]),
  );

  const onLoadMore = useCallback(
    (nextPage: number) => {
      if (!firstLoading) {
        setLoadMore(true);
        let status = selectTab.status;
        if (
          status === FeedbackStatus.ALL ||
          status === FeedbackStatus.DELETED
        ) {
          status = '';
        }
        const params = {
          status,
          advisorCode: profile?.code,
          storeIds,
          sourceId: SourceId.MOBILE,
          positionId: profile?.positionId,
          createdAtFrom: DateUtilts.clearMillisecond(firstDate.toJSON()),
          createdAtTo: DateUtilts.clearMillisecond(secondDate.toJSON()),
          sortColumn: 'createdAt',
          sortType: 'desc',
        };
        feedbackService.getFeedbacks(
          {
            ...params,
            limit: AppConfig.MaxLimit,
            page: nextPage,
          },
          (feedbacks, meta) => {
            setError(false);
            setMessage('');
            setMetadata(meta);
            setFeedbackEntities([...feedbackEntities, ...feedbacks]);
          },
          handleError,
          () => {},
          () => {
            setLoadMore(false);
          },
        );
      }
    },
    [
      feedbackEntities,
      firstLoading,
      profile?.code,
      profile?.positionId,
      selectTab.status,
      storeIds,
    ],
  );

  const onPressStatus = (selectStatus: StatusConfig) => {
    setSelectTab(selectStatus);
    let status = selectStatus.status;

    if (
      selectStatus.status === FeedbackStatus.ALL ||
      selectStatus.status === FeedbackStatus.DELETED
    ) {
      status = '';
    }

    const params = {
      status,
      advisorCode: profile?.code,
      deleted: selectStatus.isDeleted,
      storeIds,
      sourceId: SourceId.MOBILE,
      positionId: profile?.positionId,
      limit: AppConfig.MaxLimit,
      page: 1,
      createdAtFrom: DateUtilts.clearMillisecond(firstDate.toJSON()),
      createdAtTo: DateUtilts.clearMillisecond(secondDate.toJSON()),
      sortColumn: 'createdAt',
      sortType: 'desc',
    };
    feedbackService.getFeedbacks(
      params,
      handleSuccess,
      handleError,
      () => dispatch(showLoading()),
      () => dispatch(hideModal()),
    );
  };
  const reload = () => {
    let status = selectTab.status;
    if (
      selectTab.status === FeedbackStatus.ALL ||
      selectTab.status === FeedbackStatus.DELETED
    ) {
      status = '';
    }
    const params = {
      status,
      advisorCode: profile?.code,
      storeIds,
      sourceId: SourceId.MOBILE,
      positionId: profile?.positionId,
      createdAtFrom: DateUtilts.clearMillisecond(firstDate.toJSON()),
      createdAtTo: DateUtilts.clearMillisecond(secondDate.toJSON()),
      sortColumn: 'createdAt',
      sortType: 'desc',
      limit: AppConfig.MaxLimit,
      page: 1,
    };

    setError(false);
    feedbackService.getFeedbacks(
      params,
      handleSuccess,
      handleError,
      () => dispatch(showLoading()),
      () => {},
    );
  };
  const onPressCreateSlot = () => {
    navigation.navigate(MainRouteConfig.CreateSlot);
  };

  const onReload = () => {
    setFirstLoading(true);
  };

  const permissionView = useMemo(() => {
    if (
      locationSelected.locationId !== -1 &&
      locations.length !== 0 &&
      !locations.find(e => e.id === locationSelected.locationId)
    ) {
      return false;
    }
    return true;
  }, [locations, locationSelected]);

  useEffect(() => {
    if (
      locationSelected.locationId !== -1 &&
      locations.length !== 0 &&
      !locations.find(e => e.id === locationSelected.locationId)
    ) {
      setError('NotPermission');
    }
    setError(false);
  }, [locations, locationSelected]);

  const handleChangeFirstDate = (value: Date) => {
    let copiedFirstDate = new Date(value.getTime());
    copiedFirstDate.setHours(0, 0, 0);
    setFirstDate(copiedFirstDate);
  };

  const handleChangeSecondDate = (value: Date) => {
    let copiedSecondDate = new Date(value.getTime());
    copiedSecondDate.setHours(23, 59, 59);
    setSecondDate(copiedSecondDate);
  };

  useEffect(() => {
    reload();
  }, [firstDate, secondDate]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Danh sách lốt khách"
        right={
          permissionView && (
            <TouchableOpacity onPress={onPressCreateSlot}>
              <Typography
                text="Tạo lốt"
                textType="medium"
                type="h3"
                color={colors.primary.o500}
              />
            </TouchableOpacity>
          )
        }
      />

      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.Loading loading={loading}>
          <Layout.Error
            align={AlignVerticalErrorEnum.center}
            error={error}
            subTitle={message}
            errCode={errCode}>
            <View style={style.body}>
              <View style={style.totalReport}>
                <Typography
                  style={style.title}
                  type="h3"
                  text="KHÁCH ĐÃ TIẾP"
                  textType="medium"
                />
                <View style={style.row}>
                  <Typography
                    type="h0"
                    text={visitorReport.getTotalVisitorProcessed()}
                    textType="medium"
                  />
                  <Image source={icon_user} style={style.icon} />
                </View>
                <View style={style.rowBox}>
                  <View style={style.element}>
                    <View style={style.row}>
                      <Image source={ic_user_blue_circle} />
                      <View style={style.descriptionCol}>
                        <Typography
                          type="h5"
                          color={colors.secondary.o500}
                          text="Số lốt cần tiếp"
                        />
                        <Typography
                          style={style.value}
                          textType="medium"
                          type="h3"
                          text={visitorReport.getTotalLotNotProcessed()}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[style.element, style.spaceBox]}>
                    <View style={style.row}>
                      <Image source={ic_user_blue_circle} />
                      <View style={style.descriptionCol}>
                        <Typography
                          type="h5"
                          color={colors.secondary.o500}
                          text="Số lốt đã tiếp"
                        />
                        <Typography
                          style={style.value}
                          textType="medium"
                          type="h3"
                          text={visitorReport.getTotalLotProcessed()}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <Typography
                style={style.titleContainer}
                type="h3"
                textType="medium"
                text="CÁC LỐT KHÁCH TRONG NGÀY"
              />

              <View style={style.filterRow}>
                <CTRangeDatePicker
                  type="date"
                  firstValue={firstDate}
                  secondValue={secondDate}
                  onFirstValueChange={handleChangeFirstDate}
                  onSecondValueChange={handleChangeSecondDate}
                  headerText={'Chọn ngày'}
                />
              </View>

              <FlatList
                style={style.statusContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={statues}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => onPressStatus(item)}>
                      <View
                        style={[
                          style.statusElement,
                          {
                            borderColor:
                              index === selectTab.id
                                ? colors.primary.o500
                                : colors.secondary.o300,
                          },
                        ]}>
                        <Typography
                          textType={
                            index === selectTab.id ? 'medium' : 'regular'
                          }
                          text={`${
                            item.name
                          } (${visitorReport.getNumberByStatus(
                            item.status as FeedbackStatus,
                          )})`}
                          color={
                            index === selectTab.id
                              ? colors.primary.o500
                              : colors.secondary.o900
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
              <Layout.Error
                image={bg_start_search_customer}
                title={
                  !feedbackEntities.length
                    ? 'Không tìm thấy kết quả'
                    : undefined
                }
                error={
                  !feedbackEntities.length
                    ? MainErrorType.SearchNotfound
                    : false
                }>
                <CTFLastList
                  disableRefresh
                  onReLoad={onReload}
                  firstLoading={firstLoading}
                  paging={metadata}
                  data={feedbackEntities}
                  onLoadMore={onLoadMore}
                  isLoadMore={isLoadMore}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.getKeyFlatList()}
                  renderItem={({item, index}) => (
                    <CardSlotFeedback
                      firstDate={firstDate}
                      secondDate={secondDate}
                      reload={reload}
                      key={index}
                      fb={item}
                    />
                  )}
                />
              </Layout.Error>
            </View>
          </Layout.Error>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default FeedbackRecordScreen;
