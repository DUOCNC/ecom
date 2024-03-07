import React, {createRef, useEffect, useMemo, useState} from 'react';
import {ErrorType, Layout, Typography} from 'common-ui';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {style} from './style';
import moment, {Moment} from 'moment';
import {
  ModalTimekeepingRef,
  ModalTimekeepingView,
  TimeSheetView,
} from '../../../../views';
import {timekeepingService} from 'modules/timekeeping/services';
import {
  CheckTimeEntity,
  TimekeepingEntity,
  TimeSheetEntity,
  WorkdayDateEntity,
} from 'modules/timekeeping/models/entities';
import WeekSelectorView from 'modules/timekeeping/ui/views/WeekSelectorView';
import {CTButton} from 'components/Button';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import Geolocation, {
  GeolocationError,
} from '@react-native-community/geolocation';
import {showError} from 'utils/ToastUtils';
import {useAppDispatch} from 'hook';
import {openSettings} from 'react-native-permissions';
import DetailTimeKeepingModalView, {
  DetailTimeKeepingPopupRef,
} from 'modules/timekeeping/ui/views/DetailTimeKeepingModalView';
import {ic_attention, ic_circle_check} from 'assets/images';
import _ from 'lodash';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';
import logService from 'modules/personalize/services/LogService';
import {useAuth} from 'providers/contexts/AuthContext';

const StatisticalTab: React.FC = ({}) => {
  const {ScrollView} = Animated;
  const [workdayDateSelectEntity, setWorkdayDateSelectEntity] =
    useState<WorkdayDateEntity>(WorkdayDateEntity.createEmpty());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [timeSheetStart, setTimeSheetStart] = useState<TimeSheetEntity>(
    TimeSheetEntity.createEmpty(),
  );
  const [timeSheetEnd, setTimeSheetEnd] = useState<TimeSheetEntity>(
    TimeSheetEntity.createEmpty(),
  );
  const [checkTimeEntity, setCheckTimeEntity] = useState<
    Array<CheckTimeEntity>
  >([]);
  const dispatch = useAppDispatch();
  const [listDateRange, setListDateRange] = useState<Array<string>>([]);
  const modalRef = createRef<ModalTimekeepingRef>();
  const modalTimeKeepingRef = createRef<DetailTimeKeepingPopupRef>();
  const {locationSelected} = useAuth();

  const onSuccessStart = (ts: TimeSheetEntity) => {
    setError(false);
    setTimeSheetStart(ts);
  };

  const onSuccessEnd = (ts: TimeSheetEntity) => {
    setError(false);
    setTimeSheetEnd(ts);
  };
  const onError = () => {
    setError('NotfoundReport');
    setMsgError('');
  };

  const onSuccessCheckin = (timekeepingEntity: TimekeepingEntity) => {
    timekeepingService.getTimekeepingToday(
      res => {
        setTimeout(() => {
          setCheckTimeEntity(res);
        }, 400);
      },
      () => {},
      () => {},
      () => {
        modalRef.current?.setIsSuccess(true);
        modalRef.current?.setTime(
          moment(timekeepingEntity.getCreatedAt()).format('HH:mm DD/MM/YYYY'),
        );
        modalRef.current?.setAddress(timekeepingEntity.getLocationName());
        modalRef.current?.open();
      },
    );
  };
  const onErrorCheckin = (mess: string) => {
    modalRef.current?.setIsSuccess(false);
    modalRef.current?.setTime(moment().format('HH:mm DD/MM/YYYY'));
    modalRef.current?.setAddress(mess);
    setTimeout(() => {
      modalRef.current?.open();
    }, 400);
  };
  const showModalSetting = () => {
    dispatch(
      showConfirm({
        title: 'Không có quyền truy cập',
        message: 'Vui lòng cấp quyền truy cập vị trí để sử dụng tính năng này',
        okText: 'Cấp quyền',
        cancelText: 'Đóng',
        onCancel: () => {
          dispatch(hideModal());
        },
        onOk: () => {
          dispatch(hideModal());
          openSettings();
        },
      }),
    );
  };
  const handleCheckIn = () => {
    logService.saveLog({
      function: FunctionLog.ADD_CHECKIN,
      screen: ScreenLog.TIME_SHEET_SCREEN,
      action: ActionLog.CHECKIN,
      storeId: locationSelected.locationId,
      storeName: locationSelected.locationName,
    });
    dispatch(showLoading());
    Geolocation.getCurrentPosition(
      position => {
        timekeepingService.timekeepingByGPS(
          {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          },
          onSuccessCheckin,
          onErrorCheckin,
          () => {},
          () => {
            dispatch(hideModal());
          },
        );
      },
      (errorRes: GeolocationError) => {
        dispatch(hideModal());
        switch (errorRes.code) {
          case errorRes.PERMISSION_DENIED:
            showModalSetting();
            break;
          case errorRes.POSITION_UNAVAILABLE:
            showError('Không xác định được vị trí hiện tại');
            break;
          case errorRes.TIMEOUT:
            showError('Quá thời gian kết nối');
            break;
          default:
            showError(errorRes.message);
            break;
        }
      },
      {
        // enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  };
  const getTimekeepingData = (
    startWeek: Moment,
    endWeek: Moment,
    loadFirst: boolean,
  ) => {
    let date = startWeek;
    let dateRange = [];
    timekeepingService.getTimeSheet(
      _.cloneDeep(startWeek),
      onSuccessStart,
      onError,
      () => {
        setError(false);
        loadFirst ? setLoading(true) : dispatch(showLoading());
      },
      () => {
        loadFirst ? setLoading(false) : dispatch(hideModal());
      },
    );
    if (startWeek.month() !== endWeek.month()) {
      timekeepingService.getTimeSheet(
        _.cloneDeep(endWeek),
        onSuccessEnd,
        onError,
        () => {
          setError(false);
          loadFirst ? setLoading(true) : dispatch(showLoading());
        },
        () => {
          loadFirst ? setLoading(false) : dispatch(hideModal());
        },
      );
    } else {
      setTimeSheetEnd(TimeSheetEntity.createEmpty());
    }
    while (date.isBefore(endWeek)) {
      dateRange.push(date.format('YYYY-MM-DD'));
      date = _.cloneDeep(date).add(1, 'day');
    }
    setListDateRange(dateRange);
  };

  const getTimekeepingToday = () => {
    timekeepingService.getTimekeepingToday(
      res => {
        setCheckTimeEntity(res);
      },
      () => {},
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    getTimekeepingData(
      moment().startOf('isoWeek'),
      moment().endOf('isoWeek'),
      true,
    );
    getTimekeepingToday();
  }, []);
  const handleWeekChange = (startWeek: Moment, endWeek: Moment) => {
    getTimekeepingData(startWeek, endWeek, false);
  };

  const onPressData = (item: WorkdayDateEntity) => {
    setWorkdayDateSelectEntity(item);
    modalTimeKeepingRef.current?.open();
  };
  const checkinTimeTxt = useMemo(() => {
    if (checkTimeEntity.length === 0) {
      return null;
    }
    if (checkTimeEntity.length === 1) {
      return checkTimeEntity[0].getTime();
    }
    return checkTimeEntity[1].getTime();
  }, [checkTimeEntity]);

  const checkoutTimeTxt = useMemo(() => {
    if (checkTimeEntity.length === 0 || checkTimeEntity.length === 1) {
      return null;
    }
    return checkTimeEntity[0].getTime();
  }, [checkTimeEntity]);

  return (
    <Layout.Container>
      <ModalTimekeepingView ref={modalRef} handleCloseSuccess={() => {}} />
      <Layout.Loading loading={loading}>
        <View style={style.viewMonth}>
          <WeekSelectorView onChangeWeek={handleWeekChange} />
        </View>
        <Layout.Error subTitle={msgError} error={error}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.container}>
            <View style={style.tableSheet}>
              {timeSheetStart.getDates().concat(timeSheetEnd.getDates())
                .length > 0 &&
                timeSheetStart
                  .getDates()
                  .concat(timeSheetEnd.getDates())
                  .filter(item => listDateRange.includes(item.getDate()))
                  .map(item => {
                    return (
                      <TouchableOpacity onPress={() => onPressData(item)}>
                        <TimeSheetView
                          key={item.getDate()}
                          type={item.getWorkStatus()}
                          data={item}
                        />
                      </TouchableOpacity>
                    );
                  })}
            </View>
          </ScrollView>
        </Layout.Error>
      </Layout.Loading>
      <Layout.ScreenBottom>
        <View style={[style.viewBottom]}>
          <View style={style.timeKeepingContainer}>
            {!checkinTimeTxt && !checkoutTimeTxt ? (
              <View style={style.checkInNearest}>
                <View style={style.nearestLabel}>
                  <Image source={ic_attention} />
                  <Typography
                    style={style.nearestText}
                    text="Bạn chưa chấm công hôm nay"
                  />
                </View>
              </View>
            ) : (
              <View>
                {checkinTimeTxt && (
                  <View style={style.timeKeepingElement}>
                    <Image source={ic_circle_check} />
                    <Typography style={style.nearestTxt} text="Chốt gần nhất" />
                    <Typography
                      style={style.nearestTxt}
                      text={checkinTimeTxt}
                    />
                  </View>
                )}
                {checkoutTimeTxt && (
                  <View style={style.timeKeepingElement}>
                    <Image source={ic_circle_check} />
                    <Typography style={style.nearestTxt} text="Chốt gần nhất" />
                    <Typography
                      style={style.nearestTxt}
                      text={checkoutTimeTxt}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
          <CTButton onPress={handleCheckIn} text="Chấm công hôm nay" />
        </View>
      </Layout.ScreenBottom>
      <DetailTimeKeepingModalView
        ref={modalTimeKeepingRef}
        item={workdayDateSelectEntity}
      />
    </Layout.Container>
  );
};
export default StatisticalTab;
