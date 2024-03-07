import {bg_login, ic_button_login} from 'assets/images';
import React, {createRef, FC, useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from './styles';
import {CTButton} from 'components/Button';
import CTStatusBar from 'components/CTStatusBar';
import {Font} from 'components/Base/Text';
import {Typography} from 'common-ui';
import {useKeycloak} from '@react-keycloak/native';
import {AuthStackScreenProps} from '..';

type Props = AuthStackScreenProps<'LoginV2'>;
const LoginV2Screen: FC<Props> = () => {
  const {keycloak} = useKeycloak();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const accountRef = createRef<TextInput>();
  const onRegister = () => {
    keycloak?.register();
  };
  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        accountRef.current?.focus();
        setFirstLoad(false);
      }, 500);
    }
  }, [accountRef, firstLoad]);

  const signIn = async () => {
    await keycloak?.login({
      scope: 'offline_access',
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={style.container}>
        <CTStatusBar barStyle="dark-content" />
        <View style={style.containerElement}>
          <View style={style.rowLogo}>
            <Image
              resizeMode="contain"
              style={style.imgLogo}
              source={bg_login}
            />
          </View>
          <View style={style.marginView}>
            <Typography
              style={style.title}
              textType="medium"
              type="h1"
              text="Chào mừng quay trở lại"
            />
            <Text style={style.subText}>
              Vui lòng đăng nhập vào hệ thống bằng tài khoản nội bộ công ty.
            </Text>
            <CTButton
              icon={ic_button_login}
              font={Font.Medium}
              type="plain"
              textStyle={style.text}
              iconStyleProps={style.iconBtnLogin}
              style={style.loginButton}
              text="Đăng nhập bằng Unicorn"
              onPress={signIn}
            />
            <CTButton
              font={Font.Medium}
              onPress={onRegister}
              textStyle={style.txtRegister}
              type="plain"
              style={style.btnRegister}
              text="Đăng ký"
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginV2Screen;
