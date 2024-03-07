import {
  bg_customer_visitor,
  ic_rp_up,
  ic_rp_down,
  ic_help_tooltip,
} from 'assets/images';
import {useAppDispatch} from 'hook/CustomReduxHook';
import {CustomerVisitorEntity} from 'modules/personalize/models';
import {homeService} from 'modules/personalize/services';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {ActivityIndicator, Image, Platform, View} from 'react-native';
import CountView from '../CountView';
import CustomerGoStoreStyle from './style';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {showError, showSuccess} from 'utils/ToastUtils';
import Tooltip from 'react-native-walkthrough-tooltip';
import {CTButtonIcon} from 'components/Button';
import {normalize} from 'utils/DimensionsUtils';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import CTTypography from 'components/CTTypography';
import {useAuth} from 'providers/contexts/AuthContext';

export interface CustomerGoStoreProps {
  onOpenStore: () => void;
}

export type CustomerGoStoreRef = {
  refresh: () => void;
};

export type CustomerGoStore = ForwardRefRenderFunction<
  CustomerGoStoreRef,
  CustomerGoStoreProps
>;

const CustomerGoStore: CustomerGoStore = (props, ref) => {
  const dispatch = useAppDispatch();
  const [isLoad, setLoad] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [visitor, setVisitor] = useState<CustomerVisitorEntity>(
    CustomerVisitorEntity.create(),
  );

  const onUpdateVisitorEntity = (result: CustomerVisitorEntity) => {
    setVisitor(result);
  };

  const onRefresh = () => {
    setLoad(false);
  };

  const {locationSelected} = useAuth();

  const storeId = useMemo(() => {
    return locationSelected.locationId;
  }, [locationSelected.locationId]);

  const {profile} = useAuth();


  const onOpenStore = () => {
    dispatch(hideModal());
    props.onOpenStore();
  };

  const validateStore = () => {
    dispatch(
      showConfirm({
        title: 'Vui lòng chọn cửa hàng',
        message: (
          <CTTypography.Text
            style={CustomerGoStoreStyle.confirmMess}
            text="Vui lòng chọn cửa hàng mặc định là một cửa hàng cụ thể"
          />
        ),
        cancelText: 'Hủy',
        buttonType: 'default',
        cancelButtonType: 'destruction',
        okText: 'Đồng ý',
        onOk: onOpenStore,
      }),
    );
  };

  const updateCount = (count: number) => {
    if (locationSelected.locationId === -1) {
      validateStore();
      return;
    }
    dispatch(showLoading());
    visitor.updateCountToday(storeId, count);
    homeService.updateVisitor(
      storeId,
      visitor,
      onUpdateVisitorEntity,
      () => {
        showSuccess('Cập nhật khách hàng thành công');
        dispatch(hideModal());
      },
      () => {
        showError('Cập nhật khách không thành công');
        dispatch(hideModal());
      },
      true,
    );
  };

  const onPlus = (newCount: number) => {
    updateCount(newCount);
  };

  const onMinus = (newCount: number) => {
    updateCount(newCount);
  };

  const growPercent = visitor.getGrowPercent(locationSelected.locationId);

  const iconGrow = growPercent >= 0 ? ic_rp_up : ic_rp_down;

  const onKeyboardPress = (newCount: number) => {
    updateCount(newCount);
  };

  const onPreviousOpenKeyBoard = () => {
    if (locationSelected.locationId === -1) {
      validateStore();
      return false;
    }
    return true;
  };

  const currentDate = useMemo(() => {
    let date = new Date();
    return date.getDate();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: onRefresh,
  }));

  useEffect(() => {
    if (!isLoad) {
      homeService.getCustomerGoStoreCurrent(
        storeId,
        profile ? profile.code : '',
        profile ? `${profile.fullName}` : '',
        onUpdateVisitorEntity,
        () => {
          setLoad(true);
        },
      );
    }
  }, [isLoad, storeId, profile]);

  useEffect(() => {
    setLoad(false);
  }, [locationSelected.locationId]);

  return (
    <View style={CustomerGoStoreStyle.container}>
      <View style={CustomerGoStoreStyle.main}>
        <View style={CustomerGoStoreStyle.header}>
          <Typography
            color={colors.primary.o500}
            textType="medium"
            type="h3"
            text="Khách hàng vào cửa hàng"
          />
          <Tooltip
            showChildInTooltip={false}
            contentStyle={CustomerGoStoreStyle.contentStyle}
            backgroundColor={'transparent'}
            tooltipStyle={CustomerGoStoreStyle.tooltip}
            isVisible={showTooltip}
            placement="top"
            topAdjustment={Platform.select({
              android: normalize(-23),
              ios: 8,
            })}
            arrowStyle={CustomerGoStoreStyle.arrowStyle}
            content={
              <Typography
                style={CustomerGoStoreStyle.txtTooltip}
                numberOfLines={2}
                color={colors.secondary.o900}
                type="h5"
                textAlign="center"
                text={'Do chuyên viên tiếp đón \n khách hàng đếm và nhập'}
              />
            }
            onClose={() => {
              setShowTooltip(false);
            }}>
            <CTButtonIcon
              onPress={() => setShowTooltip(true)}
              icon={ic_help_tooltip}
            />
          </Tooltip>
        </View>

        {!isLoad ? (
          <View style={CustomerGoStoreStyle.viewLoading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <View style={CustomerGoStoreStyle.controlContainer}>
              <View style={CustomerGoStoreStyle.controlLeft}>
                <CountView
                  onKeyboardPress={onKeyboardPress}
                  title={locationSelected.locationName}
                  count={visitor.getCountVisitorToday(
                    locationSelected.locationId,
                  )}
                  onPlus={onPlus}
                  onMinus={onMinus}
                  onPreviousOpenKeyBoard={onPreviousOpenKeyBoard}
                />
                {currentDate > 1 && (
                  <View style={CustomerGoStoreStyle.note}>
                    <Image
                      style={CustomerGoStoreStyle.icGrow}
                      source={iconGrow}
                    />
                    <Typography
                      style={CustomerGoStoreStyle.txtGrow}
                      color={
                        growPercent >= 0
                          ? colors.success.o700
                          : colors.error.o700
                      }
                      text={Math.abs(growPercent).toString()}
                    />
                    <Typography
                      text="khách so với hôm qua"
                      textType="medium"
                      color={colors.secondary.o500}
                    />
                  </View>
                )}
              </View>
              <View style={CustomerGoStoreStyle.controlRight}>
                <Image source={bg_customer_visitor} />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default forwardRef(CustomerGoStore);
