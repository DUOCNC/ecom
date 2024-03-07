import {bg_customer_visitor, ic_rp_up, ic_rp_down, store} from 'assets/images';
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
import {ActivityIndicator, Image, View} from 'react-native';
import CountView from '../CountView';
import CustomerVisitorStyle from './style';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {showError, showSuccess} from 'utils/ToastUtils';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import CTTypography from 'components/CTTypography';
import {useAuth} from 'providers/contexts/AuthContext';

export interface CustomerVisitorProps {
  onOpenStore: () => void;
}

export type CustomerVisitorRef = {
  refresh: () => void;
};

export type CustomerVisitor = ForwardRefRenderFunction<
  CustomerVisitorRef,
  CustomerVisitorProps
>;

const CustomerVisitorView: CustomerVisitor = (props, ref) => {
  const dispatch = useAppDispatch();
  const [isLoad, setLoad] = useState<boolean>(false);
  const [visitor, setVisitor] = useState<CustomerVisitorEntity>(
    CustomerVisitorEntity.create(),
  );

  const onUpdateVisitorEntity = (result: CustomerVisitorEntity) => {
    setVisitor(result);
  };

  const onRefresh = () => {
    setLoad(false);
  };

  const {profile, locationSelected} = useAuth();

  const storeId = useMemo(() => {
    return locationSelected.locationId;
  }, [locationSelected.locationId]);

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
            style={CustomerVisitorStyle.confirmMess}
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
        showSuccess('Cập nhật khách hàng đã tiếp thành công');
        dispatch(hideModal());
      },
      () => {
        showError('Cập nhật khách không thành công');
        dispatch(hideModal());
      },
    );
  };

  const onPlus = (newCount: number) => {
    updateCount(newCount);
  };

  const onMinus = (newCount: number) => {
    updateCount(newCount);
  };

  const growPercent = visitor.getGrowPercent(store ? store.id : -1);

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
      homeService.getCustomerVisitorCurrent(
        storeId,
        profile ? profile.code : '',
        profile ? profile.fullName : '',
        onUpdateVisitorEntity,
        () => {
          setLoad(true);
        },
      );
    }
  }, [isLoad, profile, storeId]);

  useEffect(() => {
    setLoad(false);
  }, [locationSelected]);

  return (
    <View style={CustomerVisitorStyle.container}>
      <View style={CustomerVisitorStyle.main}>
        <View style={CustomerVisitorStyle.header}>
          <Typography
            color={colors.primary.o500}
            textType="medium"
            type="h3"
            text="Khách hàng đã tiếp"
          />
        </View>

        {!isLoad ? (
          <View style={CustomerVisitorStyle.viewLoading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <View style={CustomerVisitorStyle.controlContainer}>
              <View style={CustomerVisitorStyle.controlLeft}>
                <CountView
                  onKeyboardPress={onKeyboardPress}
                  title={store ? store.name : ''}
                  count={visitor.getCountVisitorToday(
                    locationSelected.locationId,
                  )}
                  onPlus={onPlus}
                  onMinus={onMinus}
                  onPreviousOpenKeyBoard={onPreviousOpenKeyBoard}
                />
                {currentDate > 1 && (
                  <View style={CustomerVisitorStyle.note}>
                    <Image
                      style={CustomerVisitorStyle.icGrow}
                      source={iconGrow}
                    />
                    <Typography
                      style={CustomerVisitorStyle.txtGrow}
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
              <View style={CustomerVisitorStyle.controlRight}>
                <Image source={bg_customer_visitor} />
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default forwardRef(CustomerVisitorView);
