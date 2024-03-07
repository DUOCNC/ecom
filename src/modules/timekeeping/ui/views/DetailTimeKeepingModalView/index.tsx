import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, Keyboard, ScrollView, View} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {
  DimentionUtils,
  ErrorType,
  Layout,
  Typography,
  useBottomSheetBackHandler,
} from 'common-ui';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ShiftEntity,
  WorkdayDateEntity,
} from 'modules/timekeeping/models/entities';
import style from './style';
import {ic_time} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';

export interface DetailTimeKeepingProps {
  item: WorkdayDateEntity;
}

export type DetailTimeKeepingPopupRef = {
  open: () => void;
  close: () => void;
};

export type DetailTimeKeepingComponent = ForwardRefRenderFunction<
  DetailTimeKeepingPopupRef,
  DetailTimeKeepingProps
>;

const DetailTimeKeepingModalView: DetailTimeKeepingComponent = (
  {item}: DetailTimeKeepingProps,
  ref,
) => {
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const modalRef = createRef<BottomSheetModal>();
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));

  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };

  useEffect(() => {
    if (!item.getCheckin() && !item.getCheckout()) {
      setError('NotfoundReport');
      setMsgError('');
    } else {
      setError(false);
      setMsgError('');
    }
  }, [item]);
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);

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
      snapPoints={[DimentionUtils.scale(300)]}
      ref={modalRef}>
      <Layout.Error subTitle={msgError} error={error}>
        <View style={style.container}>
          <View style={[style.title, style.row]}>
            <View style={style.titleLeft}>
              <Image
                source={ic_time}
                style={[{tintColor: colors.blue.o500}, style.iconTime]}
              />
              <Typography
                text="TỔNG SỐ GIỜ"
                type="h3"
                textType="medium"
                style={style.textTitle}
              />
            </View>
            <View style={style.titleRight}>
              <Typography
                text={item.getCalWorkHour()}
                textType="medium"
                style={style.textTitle}
              />
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={[style.row, style.timekeeping]}>
              <Typography text="Chấm công" color={colors.secondary.o500} />
              <View>
                <Typography text={item.getCheckin()} textType="medium" />
              </View>
            </View>
            <View style={[style.row, style.fingerprint]}>
              <View>
                <Typography text={item.getCheckout()} textType="medium" />
              </View>
            </View>
            <View style={[style.row, style.timeWorkHours]}>
              <View style={style.left}>
                <Typography text="Ca làm việc" color={colors.secondary.o500} />
              </View>
              <View style={style.right}>
                {item
                  .getShifts()
                  .map((itemShift: ShiftEntity, index: number) => {
                    return (
                      <Typography
                        text={StringUtils.format(
                          '{0} - {1}',
                          itemShift.code,
                          itemShift.name,
                        )}
                        ellipsizeMode="tail"
                        textType="medium"
                        numberOfLines={2}
                        style={index !== 0 && style.paddingTop8}
                      />
                    );
                  })}
              </View>
            </View>
          </ScrollView>
        </View>
      </Layout.Error>
      <SafeAreaView edges={['bottom']} />
    </BottomSheetModal>
  );
};

export default forwardRef(DetailTimeKeepingModalView);
