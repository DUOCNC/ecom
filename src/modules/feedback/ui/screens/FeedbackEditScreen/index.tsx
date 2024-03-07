import {ic_arrow, ic_rp_calendar} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ErrorType, Layout, Typography} from 'common-ui';
import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import CTRadio from 'components/Form/CTRadio';
import CTSelectNavigate from 'components/Form/CTSelectNavigate';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppDispatch, useConfig} from 'hook';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import {OptionEditFeedbackConfig} from 'modules/feedback/config/OptionEditFeedbackConfig';
import {FeedbackStatus} from 'modules/feedback/enums';
import {FeedbackEntity} from 'modules/feedback/models/entities';
import {BehaviorEntity} from 'modules/feedback/models/entities/BehaviorEntity';
import {feedbackService} from 'modules/feedback/services';
import RowCountView from 'modules/feedback/ui/views/RowCountView';
import React, {createRef, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {showError, showSuccess} from 'utils/ToastUtils';
import {ReasonNotBuyPopupRef, ReasonNotBuyPopupView} from '../../views';
import BehaviorPopupNotBuyView, {
  BehaviorNotBuyPopupRef,
} from '../../views/BehaviorPopupNotBuyView';
import style from './style';
import {useAuth} from 'providers/contexts/AuthContext';

type Props = MainStackScreenProps<'FeedbackEdit'>;

const FeedbackEditScreen: React.FC<Props> = ({navigation, route}) => {
  const [itemAssignee, setItemAssignee] = useState<AssigneeEntity>(
    AssigneeEntity.createEmpty,
  );
  const dispatch = useAppDispatch();
  const {feedbackId, firstDate, secondDate} = route.params;
  const [error, setError] = useState<ErrorType | false>(false);
  const [message, setMessage] = useState<string>('');
  const [id, setId] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackEntityOrigin, setFeedbackEntityOrigin] =
    useState<FeedbackEntity>(FeedbackEntity.createEmpty());
  const [behaviors, setBehaviors] = useState<BehaviorEntity[]>([]);

  const [feedbackEntity, setFeedbackEntity] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const [feedbackFormEntity, setFeedbackFormEntity] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const {locationSelected} = useAuth();
  const config = useConfig();

  const onChangeAdult = (newCount: number) => {
    const newFeedback = FeedbackEntity.clone(feedbackEntity);
    newFeedback.setNumberOfAdults(newCount);
    setFeedbackEntity(newFeedback);
  };

  const onChangeChildren = (newCount: number) => {
    const newFeedback = FeedbackEntity.clone(feedbackEntity);
    newFeedback.setNumberOfChildren(newCount);
    setFeedbackEntity(newFeedback);
  };

  const onChangeReasonDetail = (reason: string) => {
    const newFeedback = FeedbackEntity.clone(feedbackEntity);
    newFeedback.setReasonDetail(reason);
    setFeedbackEntity(newFeedback);
  };

  const handleSuccess = (fbEntity: FeedbackEntity) => {
    const assignee = AssigneeEntity.createEmpty();
    assignee.setCode(fbEntity.getAdvisorCode());
    assignee.setFullName(fbEntity.getAdvisorName());
    setItemAssignee(assignee);
    setError(false);
    setMessage('');
    if (
      route.params &&
      route.params.status &&
      route.params.status === FeedbackStatus.NOT_BUY
    ) {
      fbEntity.setStatusValue(FeedbackStatus.NOT_BUY);
    }
    setFeedbackEntity(FeedbackEntity.clone(fbEntity));
    setFeedbackEntityOrigin(FeedbackEntity.clone(fbEntity));
    setBehaviors(fbEntity.getBehaviors() || []);
  };

  const handleError = (err: ErrorType | false, msg: string) => {
    setMessage(msg);
    setError(err);
  };

  useEffect(() => {
    setError(false);
    feedbackService.getFeedbackDetail(
      feedbackId,
      handleSuccess,
      handleError,
      () => setLoading(true),
      () => setLoading(false),
    );
  }, []);

  useEffect(() => {
    if (route.params && route.params.itemAssignee) {
      const updateFeedBack = FeedbackEntity.clone(feedbackEntity);
      updateFeedBack.setAdvisorName(route.params.itemAssignee.getName());
      updateFeedBack.setAdvisorCode(route.params.itemAssignee.getCode());
      setFeedbackEntity(updateFeedBack);
      setItemAssignee(route.params.itemAssignee);
    }
  }, [route.params]);

  const code = useMemo(() => {
    if (itemAssignee) {
      return itemAssignee.getId();
    }
    return 0;
  }, [itemAssignee]);
  const reasonNotByPopupRef = createRef<ReasonNotBuyPopupRef>();
  const behaviorPopupNotBuyByPopupRef = createRef<BehaviorNotBuyPopupRef>();

  const handleFormSuccess = (fbEntity: FeedbackEntity) => {
    setFeedbackFormEntity(fbEntity);
  };

  useEffect(() => {
    feedbackService.getFormFeedback(
      handleFormSuccess,
      handleError,
      () => setLoading(true),
      () => setLoading(false),
    );
  }, []);

  const onFinishReasonNotBy = (fbEntity: FeedbackEntity) => {
    reasonNotByPopupRef.current?.close();
    setFeedbackEntity(fbEntity);
  };
  const onFinishBehavior = (data: BehaviorEntity[]) => {
    behaviorPopupNotBuyByPopupRef.current?.close();
    setBehaviors(data);
  };

  const onCancelBehavior = (data: BehaviorEntity[]) => {
    behaviorPopupNotBuyByPopupRef.current?.close();
    setBehaviors(data);
  };

  const reasonSelectedText = useMemo(() => {
    const reasonLength = feedbackEntity.getAnswerReasons().length;
    if (reasonLength > 1) {
      return StringUtils.format(
        '{0}, +{1}',
        feedbackEntity.getAnswerReasons()[0].getValueText(),
        reasonLength - 1,
      );
    }
    if (reasonLength === 1) {
      return feedbackEntity.getAnswerReasons()[0].getValueText();
    }
    return 'Chọn lý do khách không mua';
  }, [feedbackEntity]);

  const behaviorSelectedText = useMemo(() => {
    const behaviorLength = behaviors.length;
    if (behaviorLength > 1) {
      return StringUtils.format(
        '{0}, +{1}',
        behaviors[0]?.getValue(),
        behaviorLength - 1,
      );
    }
    if (behaviorLength === 1) {
      return behaviors[0]?.getValue();
    }
    return 'Chọn nguồn';
  }, [behaviors]);

  const onUpdate = () => {
    if (!feedbackEntity.getAdvisorCode()) {
      showError('Vui lòng chọn chuyên gia tư vấn');
      return;
    }
    if (
      behaviorPopupNotBuyByPopupRef.current?.keyBehaviorEntity.isEmpty() &&
      feedbackEntity.getStatusValue() === FeedbackStatus.NOT_BUY
    ) {
      showError('Vui lòng chọn KH đến cửa hàng thông qua nguồn nào');
      return;
    }
    if (
      !feedbackEntity.getReasonDetail() &&
      feedbackEntity.getStatusValue() === FeedbackStatus.NOT_BUY
    ) {
      showError('Vui lòng nhập lý do không mua');
      return;
    }

    //case khách không mua
    const newAnswers = feedbackService.buildAnswersReason(
      feedbackEntityOrigin,
      feedbackEntity,
    );
    const newFeedBack = feedbackEntity.updateAnswerReasons(
      feedbackEntity,
      newAnswers,
    );
    //call api update
    const data = newFeedBack.buildEditFeedbackRequest(
      (
        behaviorPopupNotBuyByPopupRef.current?.keyBehaviorEntity.getKeyBehaviors() ||
        []
      ).filter(item => item.quantity),
    );

    feedbackService.updateFeedback(
      id,
      data,
      () => {
        showSuccess('Cập nhật thông tin thành công');
        navigation.reset({
          index: 0,
          routes: [
            {name: MainRouteConfig.Main},
            {
              name: MainRouteConfig.FeedbackRecord,
              params: {
                firstDate,
                secondDate,
              },
            },
          ],
        });
      },

      () => showError('Cập nhật thông tin thất bại'),
      () => dispatch(showLoading()),
      () => dispatch(hideModal()),
    );
  };
  const onPressOption = (statusParam: string) => {
    const newFeedback = FeedbackEntity.clone(feedbackEntity);

    if (statusParam === FeedbackStatus.EMPTY_ADVISOR) {
      newFeedback.setAdvisorCode('');
      newFeedback.setAdvisorName('');
      setItemAssignee(AssigneeEntity.createEmpty);
    }
    newFeedback.setReasonDetail('');
    newFeedback.setStatusValue(statusParam);
    setFeedbackEntity(newFeedback);
  };
  useEffect(() => {
    if (feedbackId) {
      setId(feedbackId);
    }
  }, [feedbackId]);
  const bottom = useSafeAreaInsets().bottom;

  const storeFeedbackPilot = useMemo(() => {
    let storeId: number | undefined;
    if (!locationSelected.supported && locationSelected.locationId !== -1) {
      storeId = locationSelected.locationId;
    }
    if (config.storeUseFeedback && config.storeUseFeedback !== '') {
      const storeConfig = config.storeUseFeedback.split(',');

      if (!storeId) {
        return false;
      }
      if (storeConfig.findIndex(e => e === storeId?.toString()) !== -1) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }, [config, locationSelected]);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title={`Sửa ${feedbackEntity.getCode()}`} />
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.Loading loading={loading}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={bottom + 60}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={style.avoidingView}>
            <Layout.Error error={error} subTitle={message}>
              <KeyboardAwareScrollView
                extraScrollHeight={Platform.OS === 'ios' ? 110 : 0}
                keyboardShouldPersistTaps="handled"
                style={style.body}
                showsVerticalScrollIndicator={false}>
                <View style={style.createDate}>
                  <Image source={ic_rp_calendar} />
                  <Typography
                    color={colors.secondary.o400}
                    textType="medium"
                    text={feedbackEntity.getCreatedDate()}
                    style={style.titleDate}
                  />
                </View>

                <Typography
                  type="h3"
                  color={colors.secondary.o900}
                  textType="medium"
                  text="SỐ KHÁCH TRONG LỐT"
                  style={style.titleCountView}
                />
                <RowCountView
                  onChange={onChangeAdult}
                  value={Number(feedbackEntity.getNumberOfAdults())}
                  title="Người lớn"
                  description="Từ 18 tuổi đổ lên"
                />
                <RowCountView
                  onChange={onChangeChildren}
                  value={Number(feedbackEntity.getNumberOfChildren())}
                  title="Trẻ em"
                  description="Độ tuổi từ 2- 18"
                />
                <Typography
                  type="h3"
                  color={colors.secondary.o900}
                  textType="medium"
                  text={
                    <View style={style.titleRequireContainer}>
                      <Typography
                        type="h3"
                        color={colors.secondary.o900}
                        textType="medium"
                        text={'Chuyên gia tư vấn'}
                      />

                      <Typography
                        style={style.require}
                        type="h3"
                        color={colors.error.o500}
                        textType="medium"
                        text={'*'}
                      />
                    </View>
                  }
                  style={style.titleCountView}
                />
                <CTSelectNavigate
                  onPress={() => {
                    navigation.navigate(MainRouteConfig.AssigneeFeedback, {
                      code,
                      returnLink: MainRouteConfig.FeedbackEdit,
                    });
                  }}
                  disabled={
                    feedbackEntity.getStatusValue() ===
                    FeedbackStatus.EMPTY_ADVISOR
                  }
                  title="Chọn chuyên gia tư vấn"
                  placeholder="Chọn chuyên gia tư vấn"
                  value={itemAssignee.getName()}
                />

                <Typography
                  type="h3"
                  color={colors.secondary.o900}
                  textType="medium"
                  text="TRẠNG THÁI LỐT"
                  style={style.titleCustomer}
                />
                {OptionEditFeedbackConfig.map(element => {
                  return (
                    <TouchableOpacity
                      onPress={() => onPressOption(element.status)}
                      style={style.container}>
                      <View>
                        <CTRadio
                          selected={
                            element.status === feedbackEntity.getStatusValue()
                          }
                        />
                      </View>
                      <Typography
                        style={style.text}
                        type="h3"
                        text={element.name}
                      />
                    </TouchableOpacity>
                  );
                })}

                {storeFeedbackPilot &&
                  feedbackEntity.getStatusValue() ===
                    FeedbackStatus.NOT_BUY && (
                    <>
                      <React.Fragment>
                        <Typography
                          type="h3"
                          color={colors.secondary.o900}
                          textType="medium"
                          text="KH đến cửa hàng thông qua nguồn nào?"
                          style={style.titleReason}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            Keyboard.dismiss();
                            behaviorPopupNotBuyByPopupRef.current?.open();
                          }}>
                          <View style={style.reasonBox}>
                            <Typography
                              text={behaviorSelectedText}
                              color={colors.secondary.o500}
                            />
                            <Image source={ic_arrow} />
                          </View>
                        </TouchableOpacity>
                      </React.Fragment>

                      <Typography
                        type="h3"
                        color={colors.secondary.o900}
                        textType="medium"
                        text="Lý do khách hàng không mua hàng?"
                        style={style.titleReason}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          Keyboard.dismiss();
                          reasonNotByPopupRef.current?.open();
                          reasonNotByPopupRef.current?.setFeedback(
                            feedbackEntity,
                          );
                          reasonNotByPopupRef.current?.setFeedbackForm(
                            feedbackFormEntity,
                          );
                        }}>
                        <View style={style.reasonBox}>
                          <Typography
                            text={reasonSelectedText}
                            color={colors.secondary.o500}
                          />
                          <Image source={ic_arrow} />
                        </View>
                      </TouchableOpacity>

                      <Typography
                        type="h3"
                        color={colors.secondary.o900}
                        textType="medium"
                        text={
                          <View style={style.titleRequireContainer}>
                            <Typography
                              type="h3"
                              color={colors.secondary.o900}
                              textType="medium"
                              text="Lý do cụ thể"
                            />

                            <Typography
                              style={style.require}
                              type="h3"
                              color={colors.error.o500}
                              textType="medium"
                              text={'*'}
                            />
                          </View>
                        }
                        style={style.titleReasonDetail}
                      />

                      <TextInput
                        value={feedbackEntity.getReasonDetail()}
                        onChangeText={onChangeReasonDetail}
                        style={style.reasonInput}
                        placeholderTextColor={colors.secondary.o500}
                        placeholder="CGTV ghi lại lý do rõ ràng từ khách hàng"
                        multiline={true}
                        numberOfLines={20}
                      />
                    </>
                  )}

                <SafeAreaView edges={['bottom']} />
              </KeyboardAwareScrollView>
            </Layout.Error>

            <Layout.ScreenBottom>
              <View style={style.viewBottom}>
                <CTButton
                  disabled={
                    Number(feedbackEntity.getNumberOfAdults()) <= 0 &&
                    Number(feedbackEntity.getNumberOfChildren()) <= 0
                  }
                  onPress={onUpdate}
                  text="Cập nhật"
                  font={Font.Medium}
                />
              </View>
            </Layout.ScreenBottom>
          </KeyboardAvoidingView>
        </Layout.Loading>

        <ReasonNotBuyPopupView
          ref={reasonNotByPopupRef}
          onFinish={onFinishReasonNotBy}
        />
        <BehaviorPopupNotBuyView
          ref={behaviorPopupNotBuyByPopupRef}
          onFinish={onFinishBehavior}
          onCancel={onCancelBehavior}
          behaviorSelected={behaviors}
          totalNumberPerson={feedbackEntity.getAllPerson()}
        />
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default FeedbackEditScreen;
