import {Typography} from 'common-ui';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import CountView from './../CountView';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppDispatch} from 'hook';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  title: string;
  description: string;
  onChange: (count: number) => void;
  value: number;
}

const RowCountView: React.FC<Props> = ({
  title,
  description,
  onChange,
  value,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {locationSelected} = useAuth();

  const onOkModal = useCallback(() => {
    dispatch(hideModal());
    navigation.navigate(MainRouteConfig.AccountStore, {
      requireStoreId: true,
    });
  }, [dispatch, navigation]);

  const warningStore = useCallback(() => {
    dispatch(
      showConfirm({
        title: 'Vui lòng chọn cửa hàng',
        okText: 'Xác nhận',
        cancelText: 'Đóng',
        message: 'Bạn cần chọn cửa hàng mặc định cụ thể để cập nhật',
        buttonType: 'default',
        cancelButtonType: 'destruction',
        onOk: () => onOkModal(),
      }),
    );
  }, [dispatch, onOkModal]);
  const onKeyboardPress = (newCount: number) => {
    onChange(newCount);
  };
  const onPlus = (newCount: number) => {
    if (locationSelected.locationId === -1) {
      warningStore();
      return;
    }
    onChange(newCount);
  };

  const onMinus = (newCount: number) => {
    if (locationSelected.locationId === -1) {
      warningStore();
      return;
    }
    onChange(newCount);
  };

  return (
    <View style={[style.row, style.container]}>
      <View style={style.text}>
        <Typography
          type="h3"
          color={colors.base.black}
          textType="regular"
          text={title ?? ''}
        />
        <Typography
          type="h5"
          color={colors.secondary.o500}
          textType="regular"
          text={description}
          style={style.description}
        />
      </View>
      <View style={style.count}>
        <CountView
          onKeyboardPress={onKeyboardPress}
          title={''}
          count={value}
          onPlus={onPlus}
          onMinus={onMinus}
        />
      </View>
    </View>
  );
};

export default RowCountView;
