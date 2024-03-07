import {ic_right, bg_header_other, ic_account} from 'assets/images';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React, {createRef, FC, useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';

import {DeleteAccountStyle, TabOtherAccountStyle, TabOtherStyle} from './style';
import CTLayout from 'components/CTLayout';
import {useIsFocused} from '@react-navigation/native';
import CTRbSheet from 'components/CTRbSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CTButton} from 'components/Button';
import {
  deleteTicketMeApi,
  getTicketReasonsApi,
} from 'services/AccountService/AccountApi';
import {showError} from 'utils/ToastUtils';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {otherService} from 'modules/personalize/services';
import {OtherMenuEntity, OtherMenuTypeEntity} from 'modules/personalize/models';
import {OtherMenuGroupView} from '../../views';
import CTStatusBar from 'components/CTStatusBar';
import {OtherMenuType} from 'modules/personalize/enums';
import {normalize} from 'utils/DimensionsUtils';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {useConfig} from 'hook';
import {AccountReasonDeleteResponse} from 'model/responses';
import CTRadio from 'components/Form/CTRadio';
import {ThemeStyle} from 'assets/theme';
import {useKeycloak} from '@react-keycloak/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {AppConfig} from 'config/AppConfig';
import {useAuth} from 'providers/contexts/AuthContext';
import {useStoreFeatureHook} from 'hook/useStoreFeatureHook';
import {StringUtils} from 'common';
import BlockTimekeepingView, {
  BlockTimekeepingRef,
} from '../../views/BlockTimekeepingView';
import {EmployeeHelper} from 'modules/personalize/helper';
import useEmployee from 'hook/useEmployee';
type Props = MainStackScreenProps<'Main'>;

const TabOther: FC<Props> = ({navigation}: Props) => {
  const {keycloak} = useKeycloak();
  const [otherTypes, setOtherType] = useState<Array<OtherMenuTypeEntity>>([]);
  const isFocus = useIsFocused();
  const top = useSafeAreaInsets().top;
  const {profile, signOut} = useAuth();
  const config = useConfig();
  const dispatch = useAppDispatch();
  const bs = createRef<RBSheet>();
  const [activeReason, setActiveReason] = useState<number>(1);
  const [accountReasonDelete, setAccountReasonDelete] = useState<
    Array<AccountReasonDeleteResponse>
  >([]);
  const useTaskManagement = useStoreFeatureHook('storesTaskManagement');
  const blockTimekeepingRef = React.createRef<BlockTimekeepingRef>();
  const user = useEmployee();

  /**r
   * Event Press Ok Confirm Logout
   */
  const onLogoutOkPress = async () => {
    await dispatch(hideModal());
    if (AppConfig.appVersion === 'v1') {
      dispatch(showLoading());
      setTimeout(() => {
        dispatch(hideModal());
        signOut();
      }, 1000);
      return;
    }
    if (!keycloak) {
      return;
    }
    let logoutUrl =
      keycloak
        .createLogoutUrl()
        .replace('redirect_uri', 'post_logout_redirect_uri') +
      `&id_token_hint=${keycloak.idToken}`;
    let available = await InAppBrowser.isAvailable();
    if (!available) {
      return;
    }
    InAppBrowser.openAuth(logoutUrl, AppConfig.redirectUrl, {}).then(() => {
      keycloak.clearToken();
    });
  };

  const onLogoutPress = () => {
    dispatch(
      showConfirm({
        okText: 'Đăng xuất',
        cancelText: 'Hủy',
        message: 'Bạn có muốn kết thúc phiên đăng nhập này không?',
        title: 'Đăng xuất',
        onOk: onLogoutOkPress,
      }),
    );
  };

  const onProfilePress = () => {
    navigation.navigate(MainRouteConfig.Profile);
  };

  const onDeleteAccount = () => {
    deleteTicketMeApi(
      activeReason,
      res => {
        if (res) {
          navigation.navigate(MainRouteConfig.AccountDeleteRequest);
        }
      },
      mess => {
        showError(mess.toString());
      },
      () => {},
    );
  };

  const handleConfirmDelete = () => {
    bs.current?.close();
    setTimeout(() => {
      dispatch(
        showConfirm({
          title: 'Xác nhận yêu cầu',
          cancelText: 'Hủy',
          okText: 'Xóa',
          message:
            'Bạn đang thực hiện yêu cầu xoá tài khoản. Sau khi xác nhận, chúng tôi sẽ xem xét yêu cầu, trong thời gian chờ xem xét, bạn có thể huỷ yêu cầu xoá tài khoản này. Bạn vẫn muốn xoá?',
          onOk: () => {
            dispatch(hideModal());
            onDeleteAccount();
          },
          onCancel: () => {
            dispatch(hideModal());
          },
        }),
      );
    }, 500);
  };

  const onRequestDeleteAccountPress = () => {
    otherService.getTicket(isHaveTicket => {
      if (isHaveTicket) {
        navigation.navigate(MainRouteConfig.AccountDeleteRequest);
        return;
      }
      bs.current?.open();
    });
  };

  const onSeeAllReportGeneral = () => {
    navigation.navigate(MainRouteConfig.ReportGeneral);
  };

  const onSeeAllPress = (otherType: OtherMenuType) => {
    if (otherType === OtherMenuType.ReportGeneral) {
      onSeeAllReportGeneral();
      return;
    }
  };

  const openWebView = useCallback(
    async (link: string) => {
      if (await InAppBrowser.isAvailable()) {
        let url = '';
        switch (link) {
          case MainRouteConfig.TaskManagement:
            url = StringUtils.format(
              '{0}/{1}',
              AppConfig.UrlFe,
              config.taskManagement,
            );
            break;
          case MainRouteConfig.SingleWord:
            url = StringUtils.format(
              '{0}/{1}',
              AppConfig.UrlFe,
              config.singleWord,
            );
            break;
          case MainRouteConfig.Feedback:
            url = config.feedbackUrl ?? '';
            break;
        }

        InAppBrowser.openAuth(url, AppConfig.redirectUrl, {
          showTitle: true,
          modalEnabled: true,
        });
      }
    },
    [config],
  );

  const onPressItem = (otherMenu: OtherMenuEntity) => {
    if (otherMenu.isCheckContract()) {
      if (!EmployeeHelper.checkEcontractStatus(user)) {
        blockTimekeepingRef.current?.open();
        return;
      }
    }
    if (otherMenu.getId() === 'request_delete_account') {
      onRequestDeleteAccountPress();
      return;
    }
    if (
      [
        MainRouteConfig.Feedback,
        MainRouteConfig.TaskManagement,
        MainRouteConfig.SingleWord,
      ].includes(otherMenu.getRoute())
    ) {
      if (
        !useTaskManagement &&
        MainRouteConfig.TaskManagement === otherMenu.getRoute()
      ) {
        return navigation.navigate(MainRouteConfig.Feature);
      }
      openWebView(otherMenu.getRoute());
      return;
    }
    if (otherMenu.getRoute()) {
      navigation.navigate(otherMenu.getRoute());
    } else {
      navigation.navigate(MainRouteConfig.Feature);
    }
  };

  useEffect(() => {
    getTicketReasonsApi(
      result => setAccountReasonDelete(result),
      () => {},
      () => {},
    );
  }, []);

  /**
   * Get Master Data Menu
   */
  useEffect(() => {
    let otherType = otherService.getOtherType();
    setOtherType(otherType);
  }, []);

  if (profile === null) {
    return <View />;
  }

  return (
    <CTLayout.Body>
      {isFocus && <CTStatusBar barStyle="light-content" />}
      <Image
        style={[TabOtherStyle.btTop, {height: top + normalize(100)}]}
        source={bg_header_other}
        resizeMode="cover"
      />
      <View style={[TabOtherStyle.body, {paddingTop: top}]}>
        <TouchableOpacity
          style={TabOtherStyle.rowProfile}
          onPress={onProfilePress}>
          <View style={TabOtherStyle.viewStore}>
            <Image source={ic_account} />
          </View>
          <View style={TabOtherStyle.viewInfo}>
            <Typography
              color={colors.base.white}
              type="h3"
              ellipsizeMode="clip"
              text={`${profile.fullName}`}
            />
            <View style={TabOtherAccountStyle.accountCode}>
              <Typography
                color={colors.base.white}
                type="h4"
                text={profile.code}
              />
            </View>
          </View>
          <Image source={ic_right} style={TabOtherAccountStyle.icon} />
        </TouchableOpacity>
        <ScrollView
          style={TabOtherStyle.viewMenu}
          showsVerticalScrollIndicator={false}>
          <View style={TabOtherStyle.menu}>
            {otherTypes.map(otherMenuType => (
              <OtherMenuGroupView
                onSeeAllPress={onSeeAllPress}
                onItemPress={onPressItem}
                hideFeature={config.hideFeatureFunction}
                key={otherMenuType.getId()}
                otherMenuType={otherMenuType}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={onLogoutPress}
            style={TabOtherStyle.btnLogout}>
            <Typography
              color={colors.primary.o500}
              textType="medium"
              type="h3"
              text="Đăng xuất"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <CTRbSheet
        closeOnDragDown
        dragFromTopOnly
        ref={bs}
        height={normalize(434)}>
        <View style={TabOtherStyle.title}>
          <Typography
            color={colors.secondary.o900}
            type="h3"
            textType="medium"
            text="Chọn lý do xóa tài khoản"
          />
        </View>
        <View style={TabOtherStyle.content}>
          <View style={TabOtherStyle.note}>
            <Typography
              text="Vui lòng cho chúng tôi biết lý do bạn muốn xóa tài khoản. Thông tin bạn cung cấp sẽ giúp chúng tôi cải thiện nhiều hơn."
              type="h4"
              color={colors.secondary.o900}
              textType="medium"
            />
          </View>
          <CTLayout.Row>
            <View>
              {accountReasonDelete?.map((e, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      style={DeleteAccountStyle.container}
                      onPress={() => {
                        setActiveReason(e.id);
                      }}>
                      <View style={DeleteAccountStyle.icon}>
                        <CTRadio selected={e.id === activeReason} />
                      </View>
                      <Typography
                        style={DeleteAccountStyle.text}
                        type="h3"
                        text={e.reason}
                      />
                    </TouchableOpacity>
                    {index <= accountReasonDelete.length - 1 && (
                      <View style={[ThemeStyle.separator]} />
                    )}
                  </View>
                );
              })}
            </View>
          </CTLayout.Row>
        </View>
        <CTButton
          style={TabOtherStyle.btClose}
          onPress={handleConfirmDelete}
          type="primary"
          text="Xác nhận"
        />
        <SafeAreaView />
      </CTRbSheet>
      <BlockTimekeepingView ref={blockTimekeepingRef} />
    </CTLayout.Body>
  );
};

export default TabOther;
