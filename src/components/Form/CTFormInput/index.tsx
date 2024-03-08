/*
 * Create By: Ánh Nguyễn
 * Version: 1.0.0
 * Module: Base Component
 */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {BaseText, Font} from 'components/Base/Text';
import {
  Animated,
  Image,
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import CTText from 'components/Base/CTText';
import {CTInputStyle} from './style';
import CTInput from 'components/Base/CTInput';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {eyc_hide, eye, ic_delete, ic_scan_barcode} from 'assets/images';
import CTTypography from 'components/CTTypography';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {MainRouteConfig} from 'config/RouteConfig';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {useDispatch} from 'react-redux';
import {DataSelectCreateCustomer} from 'components/Form/CTSelectNavigate';

export interface CTInputProps extends BaseText, TextInputProps {
  title?: string | ReactNode;
  error?: string;
  isPassword?: boolean;
  hideClear?: boolean;
  isBarcode?: boolean;
  data?: DataSelectCreateCustomer;
}
const Permission =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

const CTFormInput = React.forwardRef<TextInput, CTInputProps>((props, ref) => {
  const {
    title,
    error,
    value,
    placeholder,
    hideClear,
    isPassword,
    onBlur,
    onFocus,
    onChangeText,
    editable,
    isBarcode,
    data,
    ...rest
  } = props;
  const [focusable, setFocusable] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const moveText = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const moveTextTop = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);

  const moveTextBottom = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);
  const borderColor = useMemo(() => {
    if (error !== undefined && error !== null && error !== '') {
      return Colors.Red;
    }
    return focusable ? Colors.Blue : Colors.Border;
  }, [error, focusable]);
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -normalize(14)],
  });

  const showModal = () => {
    dispatch(
      showConfirm({
        title: 'Không có quyền truy cập',
        message: 'Vui lòng cấp quyền truy cập camera để sự dụng tính năng này',
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
  const onPress = () => {
    request(Permission).then(result => {
      if (result === RESULTS.GRANTED) {
        navigation.navigate(MainRouteConfig.BarcodeScan, {
          type: 'customer',
          link: MainRouteConfig.CreateCustomer,
          data,
        });
      } else {
        showModal();
      }
    });
  };
  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };
  useEffect(() => {
    if (!focusable) {
      if (value && value !== '') {
        moveTextTop();
        return;
      }
      moveTextBottom();
    }
  }, [focusable, moveTextBottom, moveTextTop, value]);
  return (
    <View style={CTInputStyle.container}>
      <View
        style={[
          CTInputStyle.body,
          {
            borderColor: borderColor,
          },
          editable === false && CTInputStyle.disable,
        ]}>
        <Animated.View style={[CTInputStyle.animatedStyle, animStyle]}>
          {(focusable || value !== '') && (
            <CTText
              style={CTInputStyle.title}
              font={Font.Regular}
              fontSize={11}
              text={title}
            />
          )}
        </Animated.View>

        <CTInput
          ref={ref}
          editable={editable}
          style={[
            CTInputStyle.input,
            (focusable || value !== '') && CTInputStyle.inputPadding,
          ]}
          numberOfLines={1}
          placeholderTextColor={Colors.SubText2}
          selectTextOnFocus={true}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && secureTextEntry}
          focusable={focusable}
          placeholder={focusable ? '' : placeholder || title}
          onBlur={e => {
            if (value === '') {
              moveTextBottom();
            }
            setFocusable(false);
            onBlur && onBlur(e);
          }}
          onFocus={e => {
            if (value === '') {
              moveTextTop();
            }
            setFocusable(true);
            onFocus && onFocus(e);
          }}
          {...rest}
        />

        {!hideClear &&
          (value === '' ? null : (
            <TouchableOpacity
              style={CTInputStyle.btnPassword}
              onPress={() => {
                onChangeText && onChangeText('');
              }}>
              <Image source={ic_delete} />
            </TouchableOpacity>
          ))}
        {isPassword && <View style={CTInputStyle.borderPassword} />}
        {isPassword && (
          <TouchableOpacity
            style={CTInputStyle.btnPassword}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}>
            <Image source={!secureTextEntry ? eye : eyc_hide} />
          </TouchableOpacity>
        )}
        {isBarcode && (
          <TouchableOpacity
            style={CTInputStyle.btnPassword}
            onPress={() => {
              onPress();
            }}>
            <Image source={ic_scan_barcode} />
          </TouchableOpacity>
        )}
      </View>
      {error && error.length > 0 && (
        <View style={CTInputStyle.viewError}>
          <CTTypography.Text
            style={CTInputStyle.error}
            text={error}
            level="2"
          />
        </View>
      )}
    </View>
  );
});

export default CTFormInput;
