import {
  bg_header_home,
  ic_pegasus_bot,
  ic_pegasus_bot_mess,
} from 'assets/images';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppDispatch} from 'hook/CustomReduxHook';
import React, {createRef, FC, useCallback, useEffect, useState} from 'react';
import {Image, RefreshControl, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {TabHomeStyle} from './style';
import CTStatusBar from 'components/CTStatusBar';
import {
  MyWorkView,
  ReportRef,
  ReportView,
  HeaderHomeView,
  SelectStoreModalView,
  SelectStoreModalRef,
  MyWorkSimpleView,
  SlideImageView,
} from '../../views';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {useIsFocused} from '@react-navigation/native';
import {useConfig} from 'hook';
import {AdsPopupRef} from 'common-ui/types/AdsPopupRef';
import AdsPopupView from 'modules/personalize/ui/views/AdsPopupView';
import {useAuth} from 'providers/contexts/AuthContext';
import CustomerGoStoreView, {
  CustomerGoStoreRef,
} from 'modules/feedback/ui/views/CustomerGoStoreView';
import Decentralization from 'config/Decentralization/Decentralization';
import CountCustomerView, {
  CountCustomerRef,
} from 'modules/feedback/ui/views/CountCustomerView';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {AppConfig} from 'config/AppConfig';
import {StringUtils} from 'common';
import {useStoreFeatureHook} from 'hook/useStoreFeatureHook';
import {ThemeStyle} from 'assets/theme';
import {Typography} from 'common-ui';
import useTask from 'hook/useTask';
import taskService from 'modules/personalize/services/TaskService';
import {TaskEntity} from 'modules/personalize/models/entities';
import {saveTask} from 'reduxs/TaskReducer';
import {MainStore} from 'reduxs/MainStore';
import BotView from './BotView';
import {QuizStep} from 'modules/personalize/enums';
import logService from 'modules/personalize/services/LogService';
import {ActionLog, FunctionLog, ScreenLog} from 'common/enums/LogAction';
import newsService from 'modules/news/service/NewsService';
import NewsBannerEntity from 'modules/news/model/entities/NewsBannerEntity';
import BlockTimekeepingView, {
  BlockTimekeepingRef,
} from '../../views/BlockTimekeepingView';
import useEmployee from 'hook/useEmployee';
import {EmployeeHelper} from 'modules/personalize/helper';

type Props = MainStackScreenProps<'Main'>;

const TabHome: FC<Props> = ({navigation, route}: Props) => {
  const goStoreRef = createRef<CustomerGoStoreRef>();
  const selectModalRef = createRef<SelectStoreModalRef>();
  const isFocus = useIsFocused();
  const insets = useSafeAreaInsets();
  const reportRef = createRef<ReportRef>();
  const countCustomerRef = createRef<CountCustomerRef>();
  const config = useConfig();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {locationSelected} = useAuth();
  const {profile} = useAuth();
  const decentralization = new Decentralization(profile?.positionId ?? -1);
  const isFocused = useIsFocused();
  const useTaskManagement = useStoreFeatureHook('storesTaskManagement');
  const [showBot, setShowBot] = useState<boolean>(false);
  const [objTask, setObjTask] = useState<TaskEntity>();
  const [banners, setBanners] = useState<Array<NewsBannerEntity>>([]);
  const blockTimekeepingRef = React.createRef<BlockTimekeepingRef>();
  const user = useEmployee();

  const onNavigateStore = useCallback(
    (link?: string) => {
      navigation.navigate(MainRouteConfig.AccountStore, {link: link});
    },
    [navigation],
  );
  const adsPopupRef = createRef<AdsPopupRef>();
  const itemAssignee = route.params?.itemAssignee;
  const backScreen = route.params?.backScreen;

  const {task, taskEntity} = useTask();
  const onPressStore = (isSupport: boolean) => {
    selectModalRef.current?.close();
    if (isSupport) {
      navigation.navigate(MainRouteConfig.SupportStore);
      return;
    }
    navigation.navigate(MainRouteConfig.AccountStore);
  };

  const onOpenModalStoreDefault = useCallback(
    (link: string) => {
      dispatch(
        showConfirm({
          title: 'Vui lòng chọn cửa hàng',
          okText: 'Đồng ý',
          cancelText: 'Hủy',
          message: 'Vui lòng chọn cửa hàng mặc định là một cửa hàng cụ thể.',
          buttonType: 'default',
          cancelButtonType: 'destruction',
          onOk: () => {
            dispatch(hideModal());
            onNavigateStore(link);
          },
          onCancel() {
            dispatch(hideModal());
          },
        }),
      );
    },
    [dispatch, onNavigateStore],
  );

  const onPressPickStore = useCallback(() => {
    selectModalRef.current?.open();
  }, [selectModalRef]);

  const openTask = useCallback(async () => {
    if (await InAppBrowser.isAvailable()) {
      let urlTask = StringUtils.format(
        '{0}/{1}',
        AppConfig.UrlFe,
        config.taskManagement,
      );
      InAppBrowser.openAuth(urlTask, AppConfig.redirectUrl, {
        showTitle: true,
        modalEnabled: true,
        showInRecents: true,
        forceCloseOnRedirection: false,
      });
    }
  }, [config.taskManagement]);

  const openSingleWord = useCallback(async () => {
    if (await InAppBrowser.isAvailable()) {
      let urlTask = StringUtils.format(
        '{0}/{1}',
        AppConfig.UrlFe,
        config.singleWord,
      );
      InAppBrowser.openAuth(urlTask, AppConfig.redirectUrl, {
        showTitle: true,
        modalEnabled: true,
        showInRecents: true,
        forceCloseOnRedirection: false,
      });
    }
  }, [config.taskManagement]);

  const onNavigate = useCallback(
    (link: string) => {
      if (MainRouteConfig.TaskManagement === link) {
        if (!useTaskManagement) {
          return navigation.navigate(MainRouteConfig.Feature);
        }
        openTask();
        return;
      }
      if (MainRouteConfig.SingleWord === link) {
        openSingleWord();
        return;
      }
      if (MainRouteConfig.PosCreate === link) {
        logService.saveLog({
          function: FunctionLog.ADD_YOSCAN_ORDER_HOMEPAGE,
          screen: ScreenLog.HOMEPAGE_ORDER_SCREEN,
          action: ActionLog.CLICK,
          storeId: locationSelected.locationId,
          storeName: locationSelected.locationName,
        });
      }
      navigation.navigate(link);
    },
    [locationSelected, navigation, openSingleWord, openTask, useTaskManagement],
  );
  const reloadVisitor = () => {
    countCustomerRef.current?.refresh();
  };
  const onRefresh = () => {
    setRefreshing(true);
    reportRef.current?.refresh();
    goStoreRef.current?.refresh();
    reloadVisitor();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    if (isFocused) {
      reportRef.current?.refresh();
      goStoreRef.current?.refresh();
      reloadVisitor();
      //get banners
      newsService.getNewsBanners(
        {isShow: true, limit: 10},
        res => {
          setBanners(res);
        },
        () => {},
      );
    }
  }, [isFocused]);

  useEffect(() => {
    //load task
    // console.log("IHIHI",taskEntity)
    if (taskEntity) {
      setObjTask(taskEntity);
      setShowBot(true);
    } else {
      taskService.getMyTasksService(
        data => {
          if (!task && !data.isDelay()) {
            if (data.haveTraining()) {
              MainStore.dispatch(
                saveTask({
                  task: {
                    step: QuizStep.training,
                    quizId: 0,
                    status: 'training',
                  },
                }),
              );
            } else {
              console.log('Vaoday22222');
              MainStore.dispatch(
                saveTask({
                  task: {
                    step: QuizStep.waiting,
                    quizId: 0,
                    status: 'waiting',
                  },
                }),
              );
            }
          }
          if (!data.isDelay()) {
            setObjTask(data);
            setShowBot(true);
          }
          return;
        },
        error => {
          console.log(error);
        },
        () => {},
        () => {},
      );
    }
  }, [task, taskEntity]);

  const onCloseBot = () => {
    setShowBot(false);
  };

  const onBlockContract = (link: string) => {
    if (EmployeeHelper.checkEcontractStatus(user)) {
      onNavigate(link);
      return;
    }
    blockTimekeepingRef.current?.open();
  };

  return (
    <View style={[TabHomeStyle.container]}>
      {isFocus && <CTStatusBar barStyle="light-content" />}
      {!showBot && <Image style={TabHomeStyle.btTop} source={bg_header_home} />}
      <View style={[TabHomeStyle.body, {paddingTop: insets.top}]}>
        <HeaderHomeView onPressPickStore={onPressPickStore} />
        {banners.length > 0 && (
          <View style={TabHomeStyle.banner}>
            <SlideImageView
              imageUrls={banners.map(e => e.getBannerUrl())}
              newsIds={banners.map(e => e.getNewsId())}
            />
          </View>
        )}
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          style={TabHomeStyle.scroll}
          showsVerticalScrollIndicator={false}>
          {decentralization.isViewFeedback() ? (
            <React.Fragment>
              <View style={TabHomeStyle.view}>
                <MyWorkSimpleView
                  onOpenModalStoreDefault={onOpenModalStoreDefault}
                  onNavigate={onNavigate}
                  hideFeature={config.hideFeatureFunction}
                  onBlockContract={onBlockContract}
                />
              </View>
              <View style={[TabHomeStyle.view, TabHomeStyle.first]}>
                <CountCustomerView
                  ref={countCustomerRef}
                  reloadVisitor={reloadVisitor}
                  itemAssignee={itemAssignee}
                />
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View style={[TabHomeStyle.view, TabHomeStyle.first]}>
                <ReportView ref={reportRef} />
              </View>
              <View style={TabHomeStyle.view}>
                <MyWorkView
                  onOpenModalStoreDefault={onOpenModalStoreDefault}
                  onNavigate={onNavigate}
                  hideFeature={config.hideFeatureFunction}
                  onBlockContract={onBlockContract}
                />
              </View>
              <View style={TabHomeStyle.view}>
                <React.Fragment>
                  <CustomerGoStoreView
                    title="TỔNG SỐ KHÁCH ĐÃ TIẾP"
                    isStoreOnly={false}
                    ref={goStoreRef}
                  />
                </React.Fragment>
              </View>
            </React.Fragment>
          )}
        </ScrollView>
      </View>
      <SelectStoreModalView
        locationSelected={locationSelected}
        ref={selectModalRef}
        onPressStore={onPressStore}
      />
      <AdsPopupView ref={adsPopupRef} />
      {showBot && (
        <View style={TabHomeStyle.viewBot}>
          <View style={TabHomeStyle.botPopup}>
            <View style={TabHomeStyle.botHeader}>
              <View style={TabHomeStyle.botHeaderContent}>
                <Image
                  source={ic_pegasus_bot_mess}
                  style={TabHomeStyle.botIconHeader}
                />
                <Typography
                  style={TabHomeStyle.botTextHeader}
                  text="YODY - Trợ lý ảo"
                  textType="medium"
                  type="h3"
                />
              </View>
            </View>
            <View style={ThemeStyle.separator16} />
            <ScrollView style={TabHomeStyle.botContent}>
              {/* messages */}
              <BotView
                key="botview"
                taskEntity={objTask}
                task={task}
                fullName={profile?.fullName}
                onClose={onCloseBot}
                backScreen={backScreen}
              />
            </ScrollView>
          </View>
          <View style={TabHomeStyle.botViewArrow}>
            <View style={TabHomeStyle.botArrow} />
          </View>
          <View style={TabHomeStyle.bot}>
            <Image source={ic_pegasus_bot} />
          </View>
        </View>
      )}
      <BlockTimekeepingView ref={blockTimekeepingRef} />
    </View>
  );
};

export default TabHome;
