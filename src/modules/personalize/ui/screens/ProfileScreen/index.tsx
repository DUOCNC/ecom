import React, {useEffect, useState} from 'react';
import style from './style';
import {Layout, Typography} from 'common-ui';
import {ScrollView, View, Image, TouchableOpacity} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {
  bg_header_other,
  ic_contact,
  ic_lock,
  ic_right,
  ic_store_info,
  icon_user,
} from 'assets/images';
import {colors} from 'assets/v2';
import {MainRouteConfig} from 'config/RouteConfig';
import {AccountEntity} from 'modules/personalize/models';
import {accountService} from 'modules/personalize/services';
import {useAuth} from 'providers/contexts/AuthContext';
import {AppConfig} from 'config/AppConfig';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {StringUtils} from 'common';

type Props = MainStackScreenProps<'Profile'>;
const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const [account, setAccount] = useState<AccountEntity | null>(null);
  const {profile} = useAuth();
  const onNavigateAccountStore = () => {
    navigation.navigate(MainRouteConfig.AccountStore);
  };

  useEffect(() => {
    setAccount(accountService.getAccount(profile));
  }, [profile]);

  const onNavigateChangePassword = async () => {
    if (AppConfig.appVersion === 'v1') {
      navigation.navigate(MainRouteConfig.ChangePassword);
      return;
    }
    if (await InAppBrowser.isAvailable()) {
      let passwordUrl = StringUtils.format(
        '{0}/realms/{1}/account/password',
        AppConfig.keyCloakUrl,
        AppConfig.realm,
      );
      InAppBrowser.openAuth(passwordUrl, AppConfig.redirectUrl, {
        showTitle: true,
        modalEnabled: true,
      });
    }
  };

  if (!account) {
    return <View />;
  }
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thông tin cá nhân" />
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <ScrollView style={style.scrollContainer}>
          <View style={[style.cardOverView]}>
            <Image
              style={style.topCard}
              source={bg_header_other}
              resizeMode="cover"
            />
            <View style={[style.bottomCard]}>
              <Typography
                style={style.textName}
                type="h3"
                textType="medium"
                text={profile?.fullName}
              />
              <Typography
                style={style.textPosition}
                text={profile?.position}
                color={colors.secondary.o500}
              />
              <Typography
                text={profile?.departmentName}
                color={colors.secondary.o500}
              />
            </View>
            <View style={[style.avatar]}>
              <Image style={style.iconAvatar} source={icon_user} />
            </View>
          </View>

          <View style={[style.card, style.viewInfo]}>
            <View style={style.cardHeader}>
              <View style={style.viewImage}>
                <Image source={ic_contact} />
              </View>
              <Typography
                style={style.headerTile}
                text="Thông tin cá nhân"
                type="h3"
                textType="medium"
              />
              {/* <TouchableOpacity
                onPress={onNavigateProfile}
                style={style.btnEdit}>
                <Image source={ic_edit} />
              </TouchableOpacity> */}
            </View>
            <View style={style.cardBody}>
              <View style={style.rowInfo}>
                <Typography type="h3" color="#8F9096" text="Mã nhân viên" />
                <Typography
                  type="h3"
                  style={style.txtValue}
                  color={colors.primary.o900}
                  text={account.getCode()}
                />
              </View>
              <View style={style.rowInfo}>
                <Typography type="h3" color="#8F9096" text="Giới tính" />
                <Typography
                  type="h3"
                  style={style.txtValue}
                  color={colors.primary.o900}
                  text={account.getGenderDisplay()}
                />
              </View>
              <View style={style.rowInfo}>
                <Typography type="h3" color="#8F9096" text="Ngày sinh" />
                <Typography
                  type="h3"
                  style={style.txtValue}
                  color={colors.primary.o900}
                  text={account.getBirthdayDisplay()}
                />
              </View>
              <View style={style.rowInfo}>
                <Typography type="h3" color="#8F9096" text="Số điện thoại" />
                <Typography
                  type="h3"
                  style={style.txtValue}
                  color={colors.primary.o900}
                  text={account.getPhone()}
                />
              </View>
              <View style={style.rowInfo}>
                <Typography type="h3" color="#8F9096" text="Khu vực" />
                <Typography
                  type="h3"
                  style={style.txtValue}
                  color={colors.primary.o900}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  textAlign="right"
                  text={account.getLocation()}
                />
              </View>
              <View style={style.rowInfo}>
                <Typography type="h3" color="#8F9096" text="Địa chỉ" />
                <Typography
                  type="h3"
                  style={style.txtValue}
                  color={colors.primary.o900}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  textAlign="right"
                  text={account.getAddressDisplay()}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={onNavigateAccountStore}
            style={[style.btnMenu, style.topBtnMenu]}>
            <View style={style.viewImage}>
              <Image source={ic_store_info} />
            </View>
            <Typography
              type="h3"
              style={style.btnTitle}
              textType="medium"
              text="Danh sách cửa hàng trực thuộc"
            />
            <View style={style.viewRight}>
              <Image source={ic_right} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNavigateChangePassword}
            style={[style.btnMenu, style.borderTop]}>
            <View style={style.viewImage}>
              <Image source={ic_lock} />
            </View>
            <Typography
              type="h3"
              style={style.btnTitle}
              textType="medium"
              text="Đổi mật khẩu"
            />
            <View style={style.viewRight}>
              <Image source={ic_right} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default ProfileScreen;
