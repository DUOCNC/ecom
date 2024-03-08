import {ErrorProps, ErrorViewProps} from 'common-ui/types';
import React, {useCallback, useMemo} from 'react';
import Container from '../Container';
import ErrorView from '../../ErrorView';
import {
  bg_404,
  bg_can_find_store,
  bg_empty,
  bg_error,
  bg_error_system,
  bg_lost_internet,
  bg_salary,
  bg_search_error,
} from 'assets/images';
import {
  Keyboard,
  Linking,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Typography from 'common-ui/components/Typography';
import {colors} from 'assets/v2';
import {useConfig} from 'hook';
import style from './style';
import {AlignVerticalErrorEnum} from 'enums/MainErrorType';
import PhoneUtils from 'utils/PhoneUtils';

const Error: React.FC<ErrorProps> = ({
  error,
  children,
  title,
  subTitle,
  bottom,
  image,
  align = AlignVerticalErrorEnum.center,
  errCode,
  onReload,
}) => {
  const onSupportClick = () => {
    if (config && config.supportChatGroupLink) {
      Linking.openURL(`${config.supportChatGroupLink}`);
    } else {
      return;
    }
  };
  const config = useConfig();
  let dataContact = useMemo(() => {
    if (config && config.contactInfor) {
      return JSON.parse(config.contactInfor);
    } else {
      return {
        officeMid: '',
        storeMid: '',
        storeNorth: '',
        bo_ol: '',
        storeSouth: '',
      };
    }
  }, [config]);
  const handleCall = (phoneNumber: string) => {
    if (!phoneNumber) {
      return;
    }
    PhoneUtils.callNumber(phoneNumber);
  };
  const errorProps = useMemo(() => {
    if (error === 'LostInternet') {
      return {
        image: bg_lost_internet,
        title: 'Không có internet!',
        subTitle: 'Bạn vui lòng kiểm tra lại kết nối Wi-Fi hoặc 3G/4G',
        bottom: (
          <TouchableOpacity style={style.reloadButton} onPress={onReload}>
            <Typography
              textAlign="center"
              color={colors.secondary.o900}
              text={'Thử lại'}
              type="h5"
            />
          </TouchableOpacity>
        ),
      } as ErrorViewProps;
    }
    if (error === 'SearchNotfound') {
      return {
        imageSize: 'small',
        image: image ? image : bg_search_error,
        title: title ? title : 'Không tìm thấy kết quả',
        subTitle: subTitle ? subTitle : 'Vui lòng tìm kiếm với từ khóa khác',
      } as ErrorViewProps;
    }
    if (error === 'Timeout') {
      return {
        image: bg_error,
        title: 'Quá thời gian kết nối',
        subTitle: 'Vui lòng thử lại sau',
      } as ErrorViewProps;
    }
    if (error === 'Notfound') {
      return {
        image: bg_404,
        title: 'Không tìm thấy trang',
        subTitle: 'Vui lòng tìm lại trang khác',
      } as ErrorViewProps;
    }
    if (error === 'Error') {
      return {
        image: bg_error_system,
        title: `${errCode ? errCode : 500}.Hệ thống đang gặp sự cố`,
        subTitle: subTitle
          ? subTitle
          : 'Bạn vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được giải quyết.',
        imageSize: 'small',
        bottom: (
          <TouchableOpacity style={style.reloadButton} onPress={onSupportClick}>
            <Typography
              textAlign="center"
              color={colors.secondary.o900}
              text={'Liên hệ hỗ trợ'}
              type="h5"
            />
          </TouchableOpacity>
        ),
      } as ErrorViewProps;
    }
    if (error === 'NotPermission') {
      return {
        image: bg_salary,
        title: 'Bạn không có quyền truy cập.',
        subTitle:
          'Nếu bạn cần xem chức năng này, vui lòng liên hệ với phụ trách vùng để cập nhật nhóm quyền:',
        bottom: (
          <View>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.officeMid)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối văn phòng Miền Trung: ${dataContact.officeMid}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.storeMid)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối cửa hàng Miền Trung: ${dataContact.storeMid}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.storeNorth)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối cửa hàng Miền Bắc: ${dataContact.storeNorth}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.bo_ol)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối BO - OL: ${dataContact.bo_ol}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.storeSouth)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA CH Miền Nam: ${dataContact.storeSouth}`}
              />
            </TouchableOpacity>
          </View>
        ),
      } as ErrorViewProps;
    }

    if (error === 'NotPermissionReport') {
      return {
        image: bg_can_find_store,
        title: 'Không có quyền xem báo cáo',
        subTitle:
          'Nếu bạn cần xem chức năng này, vui lòng liên hệ với phụ trách vùng để cập nhật nhóm quyền:',
        bottom: (
          <View>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.officeMid)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối văn phòng Miền Trung: ${dataContact.officeMid}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.storeMid)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối cửa hàng Miền Trung: ${dataContact.storeMid}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.storeNorth)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối cửa hàng Miền Bắc: ${dataContact.storeNorth}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.bo_ol)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA khối BO - OL: ${dataContact.bo_ol}`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCall(dataContact.storeSouth)}
              style={style.contactElement}>
              <Typography
                textAlign="center"
                color={colors.secondary.o25}
                text={`TA CH Miền Nam: ${dataContact.storeSouth}`}
              />
            </TouchableOpacity>
          </View>
        ),
      } as ErrorViewProps;
    }

    if (error === 'VersionError') {
      return {
        image: bg_error,
        title: 'Đã có phiên bản cập nhật mới',
        subTitle: 'Vui lòng cập nhật để tiếp tục sử dụng app',
        bottom: (
          <TouchableOpacity
            onPress={() => {
              let link = Platform.select({
                ios: '',
                android: 'linkandroid',
                default: '',
              });
              Linking.canOpenURL(link).then(
                supported => {
                  supported && Linking.openURL(link);
                },
                err => console.log(err),
              );
            }}>
            <Typography
              color={colors.primary.o500}
              textType="medium"
              text="Cập nhật"
            />
          </TouchableOpacity>
        ),
      } as ErrorViewProps;
    }

    if (error === 'NotfoundReport') {
      return {
        image: bg_empty,
        title: 'Không có dữ liệu',
        subTitle: 'Bạn vui lòng quay lại sau!',
      } as ErrorViewProps;
    }
    return error;
  }, [error, image, subTitle, title]);
  return (
    <Container>
      {errorProps === false ? (
        children
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[style.container, style[align]]}>
            <ErrorView bottom={bottom} {...errorProps} />
          </View>
        </TouchableWithoutFeedback>
      )}
    </Container>
  );
};

export default Error;
