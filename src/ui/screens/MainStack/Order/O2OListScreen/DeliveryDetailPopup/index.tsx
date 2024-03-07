import {ic_circle_check, ic_close} from 'assets/images';
import {Font} from 'components/Base/Text';
import {CTButtonIcon} from 'components/Button';
import CTTypography from 'components/CTTypography';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {
  DimentionUtils,
  Layout,
  Typography,
  useBottomSheetBackHandler,
} from 'common-ui';
import Style from './style';
import {
  OrderFulfillmentLineItemSearchSubDto,
  OrderFulfillmentSearchDto,
} from 'model/dto/OrderService/OrderSearchDto';
import {colors} from 'assets/v2';
import Clipboard from '@react-native-clipboard/clipboard';
import {showError, showSuccess} from 'utils/ToastUtils';
import Timeline from 'react-native-timeline-flatlist';
import {OrderTrackingLogDto} from 'model/dto/OrderService/OrderTrackingLogDto';
import {StringUtils} from 'common';
import moment from 'moment';
import {DateFormatPattern} from 'common/enums';
import {getOrderTrackingLogApi} from 'services/OrderService/OrderApi';

export interface DeliveryDetailPopupProps {}

export type DeliveryDetailPopupRef = {
  open: () => void;
  close: () => void;
  setFulfillment: (
    fm: OrderFulfillmentLineItemSearchSubDto | OrderFulfillmentSearchDto,
  ) => void;
};

export type DeliveryDetailPopupComponent = ForwardRefRenderFunction<
  DeliveryDetailPopupRef,
  DeliveryDetailPopupProps
>;

export interface TimeLineProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DeliveryDetailPopup: DeliveryDetailPopupComponent = ({}, ref) => {
  const modalRef = createRef<BottomSheetModal>();
  const [loading, setLoading] = useState<boolean>(true);
  const [fulfillment, setFulfillment] = useState<any>();
  const [tracking, setTracking] = useState<Array<OrderTrackingLogDto>>([]);
  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };

  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    setFulfillment: setFulfillment,
    setTracking: setTracking,
  }));

  const handleCopy = () => {
    if (fulfillment && fulfillment.shipment) {
      Clipboard.setString(fulfillment.shipment.trackingCode);
      showSuccess('Sao chép mã vận đơn');
    }
  };

  const iconCheck = () => {
    return <Image source={ic_circle_check} style={Style.iconCheck} />;
  };

  const handleError = (errors: Array<string>) => {
    const err = errors[0];
    showError(err);
  };

  useEffect(() => {
    if (fulfillment) {
      getOrderTrackingLogApi(
        fulfillment.code,
        res => {
          setTracking(res);
        },
        errors => {
          handleError(errors);
        },
        () => setLoading(false),
      );
    }
  }, [fulfillment]);

  const trackingLog = useMemo(() => {
    let data: Array<TimeLineProps> = [];
    if (tracking && tracking.length > 0) {
      tracking.filter(e => {
        data.push({
          title: e.shippingStatus ?? e.partnerNote,
          description: StringUtils.format(
            '{0} - {1}',
            moment(e.createdDate).format(DateFormatPattern.DDMMYYYY),
            moment(e.createdDate).format(DateFormatPattern.HHMMSS),
          ),
          icon: iconCheck(),
        });
      });
    }
    return data;
  }, [tracking]);

  return (
    <BottomSheetModal
      index={0}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      onChange={handleSheetPositionChange}
      handleComponent={null}
      onDismiss={Keyboard.dismiss}
      snapPoints={[DimentionUtils.scale(450)]}
      ref={modalRef}>
      <Layout.SafeAreaContainer edges={['bottom']}>
        <View style={Style.container}>
          <View style={Style.header}>
            <CTButtonIcon
              onPress={onClose}
              style={Style.icClose}
              icon={ic_close}
              iconStyle={Style.iconClose}
            />
            <View>
              <CTTypography.Text
                font={Font.Medium}
                level="2"
                text="Tình trạng vận chuyển"
              />
            </View>
          </View>
          <View style={[Style.body]}>
            <View style={[Style.row, Style.rowOne]}>
              <View style={Style.row}>
                <Typography text="Mã vận đơn: " color={colors.secondary.o500} />
                <Typography
                  text={fulfillment?.shipment?.trackingCode}
                  textType="medium"
                />
              </View>
              <TouchableOpacity onPress={handleCopy} style={Style.copy}>
                <Typography
                  text="Sao chép"
                  type="h5"
                  color={colors.secondary.o500}
                />
              </TouchableOpacity>
            </View>
            <View style={Style.row}>
              <Typography
                text="Vận chuyển bởi: "
                color={colors.secondary.o500}
              />
              <Typography
                text={fulfillment?.shipment?.deliveryServiceProviderName}
                color={colors.secondary.o500}
              />
            </View>
            <Layout.Loading loading={loading}>
              <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                <View style={Style.rowTimeline}>
                  {trackingLog && trackingLog.length > 0 ? (
                    <Timeline
                      showTime={false}
                      data={trackingLog}
                      innerCircle={'icon'}
                      circleSize={20}
                      lineColor={colors.secondary.o400}
                      lineWidth={4}
                      isUsingFlatlist
                      options={{scrollEnabled: false}}
                      renderDetail={item => {
                        return (
                          <View style={Style.timeLineDetail}>
                            <View style={Style.row1}>
                              <Typography
                                text={item.title}
                                color={colors.secondary.o500}
                                textType="medium"
                              />
                            </View>
                            <View style={Style.row2}>
                              <Typography
                                text={item.description}
                                color={colors.secondary.o500}
                              />
                            </View>
                          </View>
                        );
                      }}
                    />
                  ) : (
                    <Typography
                      text="Chưa có tiến trình giao hàng."
                      color={colors.secondary.o400}
                      type="h4"
                    />
                  )}
                </View>
              </BottomSheetScrollView>
            </Layout.Loading>
          </View>
        </View>
      </Layout.SafeAreaContainer>
    </BottomSheetModal>
  );
};

export default forwardRef(DeliveryDetailPopup);
