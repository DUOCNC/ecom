import {Typography} from 'common-ui';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {style} from './style';
import {icon_stop} from 'assets/images';
import {colors} from 'assets/v2';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import {MainRouteConfig} from 'config/RouteConfig';
import {useConfig} from 'hook';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';

interface Props {}
export type BlockTimekeepingRef = {
  open: () => void;
  close: () => void;
};

type IBlockTimekeeping = ForwardRefRenderFunction<BlockTimekeepingRef, Props>;

const BlockTimekeepingView: IBlockTimekeeping = ({}, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const config = useConfig();

  const onOpen = () => {
    setIsVisible(true);
  };
  const onClose = () => {
    setIsVisible(false);
  };
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));

  const onNavigate = () => {
    navigation.navigate(MainRouteConfig.NewsDetail, {
      id: config.instructionContract,
    });
    onClose();
  };

  return (
    <Modal
      useNativeDriverForBackdrop
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={onClose}
      isVisible={isVisible}>
      <View style={style.container}>
        <Image source={icon_stop} />
        <Typography
          style={style.row3}
          text="Bạn không thể truy cập!"
          color={colors.error.o500}
          textType="medium"
          type="h2"
        />
        <Typography
          style={style.row4}
          type="h4"
          text="Có vẻ như bạn chưa ký số HĐLĐ. Vui lòng thực hiện việc ký số trên 1Office."
          lineHeight={22}
        />
        <Typography
          type="h4"
          style={style.row5}
          lineHeight={22}
          text="Nếu bạn đã hoàn thành, hãy đợi BGĐ ký để hoàn tất hợp đồng. Thời gian ký số: 9h và 15h hàng ngày. Để không ảnh hưởng đến giờ công, bạn vui lòng tạo đơn check-in bổ sung vào ngày hôm sau. YODY xin cảm ơn!"
        />
        <View style={style.row6}>
          <CTButton
            onPress={onNavigate}
            font={Font.Medium}
            text="Xem hướng dẫn ký số"
          />
        </View>
        <View style={style.row7}>
          <TouchableOpacity style={style.bottomClose} onPress={onClose}>
            <Typography
              text="Đóng"
              textType="medium"
              color={colors.secondary.o900}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default forwardRef(BlockTimekeepingView);
