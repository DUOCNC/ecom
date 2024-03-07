import React, {useEffect, useMemo, useState} from 'react';
import {Layout, Typography} from 'common-ui';
import {Image, View} from 'react-native';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import style from './style';
import {colors} from 'assets/v2';
import {FeedbackEntity} from 'modules/feedback/models/entities';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import RowCountView from 'modules/feedback/ui/views/RowCountView';
import CTSelectNavigate from 'components/Form/CTSelectNavigate';
import {MainRouteConfig} from 'config/RouteConfig';
import feedbackService from '../../../services/FeedbackService';
import {useAuth} from 'providers/contexts/AuthContext';
import {showError, showSuccess} from 'utils/ToastUtils';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {useAppDispatch} from 'hook';
import {ic_attention, ic_attention_circle} from 'assets/images';

type Props = MainStackScreenProps<'CreateSlot'>;

const CreateSlotScreen: React.FC<Props> = ({route, navigation}) => {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const {locationSelected} = useAuth();
  const dispatch = useAppDispatch();
  const onChangeAdult = (newCount: number) => {
    const newFeedback = FeedbackEntity.clone(feedbackForm);
    newFeedback.setNumberOfAdults(newCount);
    setFeedbackForm(newFeedback);
  };
  const [disabled, setDisabled] = useState(false);
  const onChangeChildren = (newCount: number) => {
    const newFeedback = FeedbackEntity.clone(feedbackForm);
    newFeedback.setNumberOfChildren(newCount);
    setFeedbackForm(newFeedback);
  };
  const code = useMemo(() => {
    if (route.params && route.params.itemAssignee) {
      return route.params.itemAssignee.getId();
    }
    return 0;
  }, [route.params]);

  const name = useMemo(() => {
    if (route.params && route.params.itemAssignee) {
      return route.params.itemAssignee.getName();
    }
    return '';
  }, [route.params]);

  const codeName = useMemo(() => {
    if (route.params && route.params.itemAssignee) {
      return route.params.itemAssignee.getCode();
    }
    return '';
  }, [route.params]);
  const onCreateFeedBack = async () => {
    const request = FeedbackEntity.clone(feedbackForm);
    request.setStoreId(locationSelected.locationId);
    setFeedbackForm(request);
    const data = request
      .updateAnswerReasons(request, [])
      .buildCreateFeedbackRequest();
    setDisabled(true);
    feedbackService.createFeedback(
      data,
      () => {
        showSuccess('Cập nhật thông tin thành công');
        const newFeedback = FeedbackEntity.clone(request);
        newFeedback.setNumberOfAdults(0);
        newFeedback.setNumberOfChildren(0);
        newFeedback.setAdvisorName('');
        newFeedback.setAdvisorCode('');
        setFeedbackForm(newFeedback);
        navigation.setParams({itemAssignee: undefined});
        navigation.reset({
          index: 0,
          routes: [
            {name: MainRouteConfig.Main},
            {name: MainRouteConfig.FeedbackRecord},
          ],
        });
      },
      () => {
        showError('Cập nhật thông tin thất bại');
      },
      () => dispatch(showLoading()),
      () => {
        setDisabled(false);
        dispatch(hideModal());
      },
    );
  };

  useEffect(() => {
    if (route.params && route.params.itemAssignee) {
      const newFeedback = FeedbackEntity.clone(feedbackForm);
      newFeedback.setAdvisorCode(route.params.itemAssignee.getCode());
      newFeedback.setAdvisorName(route.params.itemAssignee.getName());
      setFeedbackForm(newFeedback);
    }
  }, [route.params]);

  useEffect(() => {
    feedbackService.getFormFeedback(
      (feedbackEntity: FeedbackEntity) => {
        feedbackEntity.setStoreId(locationSelected.locationId);
        setFeedbackForm(feedbackEntity);
      },
      () => {},
      () => {},
      () => {},
    );
  }, []);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Tạo lốt khách" />
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <View style={style.container}>
          <View style={style.warning}>
            <Image style={style.icWarning} source={ic_attention_circle} />
            <Typography
              text="Chỉ tạo được lốt trong ngày."
              color={colors.secondary.o900}
            />
          </View>
          <Typography
            type="h3"
            color={colors.secondary.o900}
            textType="medium"
            text="SỐ KHÁCH VÀO"
            style={style.title}
          />
          <RowCountView
            onChange={onChangeAdult}
            value={Number(feedbackForm.getNumberOfAdults())}
            title="Người lớn"
            description="Từ 18 tuổi đổ lên"
          />
          <RowCountView
            onChange={onChangeChildren}
            value={Number(feedbackForm.getNumberOfChildren())}
            title="Trẻ em"
            description="Độ tuổi từ 2- 18"
          />

          <CTSelectNavigate
            onPress={() => {
              navigation.navigate(MainRouteConfig.AssigneeFeedback, {
                code,
                returnLink: MainRouteConfig.CreateSlot,
              });
            }}
            title="Chọn chuyên gia tư vấn"
            placeholder="Chọn chuyên gia tư vấn"
            value={
              codeName || name ? `${codeName.toUpperCase()} - ${name}` : ''
            }
          />
        </View>

        <Layout.ScreenBottom>
          <View style={style.viewBottom}>
            <CTButton
              disabled={
                (Number(feedbackForm.getNumberOfAdults()) <= 0 &&
                  Number(feedbackForm.getNumberOfChildren()) <= 0) ||
                disabled
              }
              onPress={onCreateFeedBack}
              text="Gửi"
              font={Font.Medium}
            />
          </View>
        </Layout.ScreenBottom>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default CreateSlotScreen;
