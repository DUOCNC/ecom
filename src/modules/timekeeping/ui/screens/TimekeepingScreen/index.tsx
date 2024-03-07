import React, {createRef, useEffect, useState} from 'react';
import {Layout, Typography} from 'common-ui';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {useAppDispatch} from 'hook';
import {colors} from 'assets/v2';
import style from './style';
import moment from 'moment';
import {StringUtils} from 'common';
import {bg_locate, ic_right} from 'assets/images';
import {
  BoxRealTimeView,
  ModalTimekeepingRef,
  ModalTimekeepingView,
  NearestCheckInView,
} from '../../views';
import Geolocation, {
  GeolocationError,
} from '@react-native-community/geolocation';
import {openSettings} from 'react-native-permissions';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {timekeepingService} from 'modules/timekeeping/services';
import {
  CheckTimeEntity,
  TimekeepingEntity,
} from 'modules/timekeeping/models/entities';
import {showError} from 'utils/ToastUtils';
import {MainRouteConfig} from 'config/RouteConfig';

const today = moment().format('DD/MM');

type Props = MainStackScreenProps<'Timekeeping'>;

const TimekeepingScreen: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checkTimeEntity, setCheckTimeEntity] =
    useState<Array<CheckTimeEntity>>();
  const modalRef = createRef<ModalTimekeepingRef>();
  const dispatch = useAppDispatch();

  const onSuccess = (timekeepingEntity: TimekeepingEntity) => {
    modalRef.current?.setIsSuccess(true);
    modalRef.current?.setTime(
      moment(timekeepingEntity.getCreatedAt()).format('HH:mm DD/MM/YYYY'),
    );
    modalRef.current?.setAddress(timekeepingEntity.getLocationName());
    setTimeout(() => {
      modalRef.current?.open();
    }, 400);
  };

  const onError = (err: string) => {
    modalRef.current?.setIsSuccess(false);
    modalRef.current?.setTime(moment().format('HH:mm DD/MM/YYYY'));
    modalRef.current?.setAddress(
      'Địa chỉ của bạn quá xa so với vị trí chấm công định vị.',
    );
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
    dispatch(showLoading());
    Geolocation.getCurrentPosition(
      position => {
        timekeepingService.timekeepingByGPS(
          {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          },
          onSuccess,
          onError,
          () => {},
          () => {
            dispatch(hideModal());
          },
        );
      },
      (error: GeolocationError) => {
        dispatch(hideModal());
        switch (error.code) {
          case error.PERMISSION_DENIED:
            showModalSetting();
            break;
          case error.POSITION_UNAVAILABLE:
            showError('Không xác định được vị trí hiện tại');
            break;
          case error.TIMEOUT:
            showError('Quá thời gian kết nối');
            break;
          default:
            showError(error.message);
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

  const handleOpenTimeSheet = () => {
    navigation.navigate(MainRouteConfig.TimeSheet);
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
    getTimekeepingToday();
  }, []);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Chấm công" />
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.Loading loading={loading}>
          <ScrollView style={style.body}>
            <View style={[style.row, style.rowTimeNow]}>
              <View>
                <Typography
                  text={StringUtils.format('CHẤM CÔNG NGÀY {0}', today)}
                  textType="medium"
                  type="h3"
                  style={style.title}
                  color={colors.primary.o900}
                />
              </View>
              <BoxRealTimeView />
            </View>
            <View style={style.locate}>
              <Image source={bg_locate} />
            </View>
            <TouchableOpacity
              style={style.btnTimekeeping}
              onPress={handleCheckIn}>
              <Typography
                text="Chấm công theo định vị"
                color={colors.base.white}
                textType="medium"
                type="h3"
              />
            </TouchableOpacity>
            <ScrollView>
              {checkTimeEntity && <NearestCheckInView data={checkTimeEntity} />}
            </ScrollView>
            <Typography
              style={[style.row, style.timeSheet]}
              text="Bảng công"
              textType="medium"
              type="h3"
            />
            <TouchableOpacity
              activeOpacity={0.95}
              style={style.btnTimeSheetShadow}
              onPress={handleOpenTimeSheet}>
              <View style={[style.btnTimeSheet, style.row]}>
                <Typography text="Xem chi tiết bảng công" />
                <Image source={ic_right} />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Layout.Loading>
      </Layout.SafeAreaContainer>
      <ModalTimekeepingView
        ref={modalRef}
        handleCloseSuccess={getTimekeepingToday}
      />
    </Layout.Screen>
  );
};

export default TimekeepingScreen;
