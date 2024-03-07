import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {View} from 'react-native';
import style from './style';
import RowCountView from 'modules/feedback/ui/views/RowCountView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CTSelectNavigate from 'components/Form/CTSelectNavigate';
import {BottomMainConfig, MainRouteConfig} from 'config/RouteConfig';
import {RootStackParamList} from 'ui/screens/MainStack';
import {CTButton} from 'components/Button';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import feedbackService from '../../../services/FeedbackService';
import {FeedbackEntity} from 'modules/feedback/models/entities';
import {showError, showSuccess} from 'utils/ToastUtils';
import {useAppDispatch} from 'hook';
import {hideModal, showConfirm, showLoading} from 'reduxs/Modals/ModalReducer';
import {useAuth} from 'providers/contexts/AuthContext';
import CustomerGoStoreView, {
  CustomerGoStoreRef,
} from 'modules/feedback/ui/views/CustomerGoStoreView';
import customerGoStoreView from 'modules/feedback/ui/views/CustomerGoStoreView';

export interface CountCustomerProps {
  itemAssignee: AssigneeEntity;
  reloadVisitor: () => void;
}

export type CountCustomerRef = {
  refresh: () => void;
};

export type CountCustomer = ForwardRefRenderFunction<
  CountCustomerRef,
  CountCustomerProps
>;

const CountCustomerView: CountCustomer = ({itemAssignee}, ref) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {locationSelected} = useAuth();
  const [feedbackForm, setFeedbackForm] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const [reload, setReload] = useState(false);
  const goStoreRef = createRef<CustomerGoStoreRef>();

  const onRefresh = () => {
    goStoreRef.current?.refresh();
  };
  const [disabled, setDisabled] = useState(false);

  useImperativeHandle(ref, () => ({
    refresh: onRefresh,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (itemAssignee) {
      const newFeedback = FeedbackEntity.clone(feedbackForm);
      newFeedback.setAdvisorCode(itemAssignee.getCode());
      newFeedback.setAdvisorName(itemAssignee.getName());
      setFeedbackForm(newFeedback);
    }
  }, [itemAssignee]);
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

  const onChangeAdult = (newCount: number) => {
    const newFeedback = FeedbackEntity.clone(feedbackForm);
    newFeedback.setNumberOfAdults(newCount);

    setFeedbackForm(newFeedback);
  };

  const onChangeChildren = (newCount: number) => {
    const newFeedback = FeedbackEntity.clone(feedbackForm);
    newFeedback.setNumberOfChildren(newCount);
    setFeedbackForm(newFeedback);
  };

  const onCreateFeedBack = async () => {
    const request = FeedbackEntity.clone(feedbackForm);
    request.setStoreId(locationSelected.locationId);
    setFeedbackForm(request);
    if (locationSelected.locationId === -1) {
      warningStore();
      return;
    }

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
      },
      (code, msg) => {
        showError('Cập nhật thông tin thất bại');
      },
      () => dispatch(showLoading()),
      () => {
        setDisabled(false);
        setReload(true);
        dispatch(hideModal());
      },
    );
  };
  const code = useMemo(() => {
    if (itemAssignee) {
      return itemAssignee.getId();
    }
    return 0;
  }, [itemAssignee]);

  const name = useMemo(() => {
    if (itemAssignee) {
      return itemAssignee.getName();
    }
    return '';
  }, [itemAssignee]);

  const codeName = useMemo(() => {
    if (itemAssignee) {
      return itemAssignee.getCode();
    }
    return '';
  }, [itemAssignee]);

  useEffect(() => {
    if (reload) {
      onRefresh();
    }
    setReload(false);
  }, [reload]);

  return (
    <>
      <View style={style.container}>
        <View style={style.headerLeft}>
          <Typography
            type="h3"
            color={colors.secondary.o900}
            textType="medium"
            text="SỐ KHÁCH VÀO"
            style={style.title}
          />
        </View>
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
              returnLink: BottomMainConfig.Home,
            });
          }}
          title="Chọn chuyên gia tư vấn"
          placeholder="Chọn chuyên gia tư vấn"
          value={codeName || name ? `${codeName} - ${name}` : ''}
        />
        <CTButton
          disabled={
            (Number(feedbackForm.getNumberOfAdults()) <= 0 &&
              Number(feedbackForm.getNumberOfChildren()) <= 0) ||
            disabled
          }
          style={style.buttonSubmit}
          text="Gửi"
          onPress={onCreateFeedBack}
        />
      </View>
      <CustomerGoStoreView
        title="TỔNG SỐ KHÁCH VÀO"
        ref={goStoreRef}
        isStoreOnly={true}
      />
    </>
  );
};

export default forwardRef(CountCustomerView);
