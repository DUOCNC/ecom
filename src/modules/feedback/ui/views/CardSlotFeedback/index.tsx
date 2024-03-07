import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ic_dots_horizontal} from 'assets/images';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {Typography} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppDispatch, useConfig} from 'hook';
import {FEEDBACK_PERMISSIONS} from 'modules/feedback/config';
import {FeedbackStatus} from 'modules/feedback/enums';
import {FeedbackActionUpdateStatus} from 'modules/feedback/enums/FeedbackStatus';
import {FeedbackEntity} from 'modules/feedback/models/entities';
import {StatusUpdateRequest} from 'modules/feedback/models/requests';
import {feedbackService} from 'modules/feedback/services';
import ButtonActionFeedback from 'modules/feedback/ui/views/ButtonActionFeedback';
import ModalActionView from 'modules/feedback/ui/views/ModalActionView';
import StatusTagView from 'modules/feedback/ui/views/StatusTagView';
import {ModalPromotionRef} from 'modules/product/ui/views/ModalPromotionView';
import {useAuth} from 'providers/contexts/AuthContext';
import React, {createRef, useCallback, useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {RootStackParamList} from 'ui/screens/MainStack';
import {showError, showSuccess} from 'utils/ToastUtils';
import BehaviorPopupNotBuyView, {
  BehaviorNotBuyPopupRef,
} from '../BehaviorPopupNotBuyView';
import style from './style';
import {KeyBehaviorRequest} from 'modules/feedback/models/entities/BehaviorEntity';

interface props {
  fb: FeedbackEntity;
  reload: () => void;
  firstDate: Date;
  secondDate: Date;
}

const CardSlotFeedback: React.FC<props> = ({
  fb,
  reload,
  firstDate,
  secondDate,
}) => {
  const {profile} = useAuth();
  const modalRef = createRef<ModalPromotionRef>();
  const behaviorPopupNotBuyByPopupRef = createRef<BehaviorNotBuyPopupRef>();

  const onPressAction = () => {
    modalRef.current?.open();
  };
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {locationSelected} = useAuth();
  const config = useConfig();

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

  const onPressBuy = () => {
    if (storeFeedbackPilot) {
      behaviorPopupNotBuyByPopupRef.current?.open();
      return;
    }

    const data: StatusUpdateRequest = {
      action: FeedbackActionUpdateStatus.BOUGHT,
      advisorName: profile?.fullName ?? null,
      advisorCode: profile?.code ?? null,
    };
    const idFeedback = fb.getId();
    feedbackService.updateStatusFeedback(
      idFeedback,
      data,
      () => {
        showSuccess('Cập nhật thành công');
        setTimeout(() => {
          reload();
        }, 500);
      },
      () => {
        dispatch(hideModal());
        showError('Cập nhật thất bại');
      },
      () => dispatch(showLoading()),
    );
  };

  const onPressBehavior = (key_behaviors: KeyBehaviorRequest[]) => {
    const data: StatusUpdateRequest = {
      action: FeedbackActionUpdateStatus.BOUGHT,
      advisorName: profile?.fullName ?? '',
      advisorCode: profile?.code ?? '',
      key_behaviors,
    };
    const idFeedback = fb.getId();
    feedbackService.updateFeedbackWidthBehavior(
      idFeedback,
      data,
      () => {
        showSuccess('Cập nhật thành công');
        setTimeout(() => {
          reload();
        }, 500);
      },
      () => {
        dispatch(hideModal());
        showError('Cập nhật thất bại');
      },
      () => dispatch(showLoading()),
    );
  };
  const onPressCancel = () => {
    const data: StatusUpdateRequest = {
      action: FeedbackActionUpdateStatus.REJECTED,
      advisorName: profile?.fullName ?? '',
      advisorCode: profile?.code ?? '',
    };
    const idFeedback = fb.getId();
    feedbackService.updateStatusFeedback(
      idFeedback,
      data,
      () => {
        showSuccess('Từ chối lốt khách hàng thành công');
        setTimeout(() => {
          reload();
        }, 500);
      },
      () => {
        dispatch(hideModal());
        showError('Từ chối lốt khách hàng thất bại');
      },
      () => dispatch(showLoading()),
    );
  };

  const onPressNotBuy = () => {
    navigation.navigate(MainRouteConfig.FeedbackEdit, {
      feedbackId: fb.getId(),
      onGoBack: () => reload(),
      status: FeedbackStatus.NOT_BUY,
      firstDate,
      secondDate,
    });
  };
  const onPressConfirm = useCallback(() => {
    const data: StatusUpdateRequest = {
      action: FeedbackActionUpdateStatus.ACCEPTED,
      advisorName: profile?.fullName ?? null,
      advisorCode: profile?.code ?? null,
    };
    const idFeedback = fb.getId();
    feedbackService.updateStatusFeedback(
      idFeedback,
      data,
      () => {
        showSuccess('Nhận lốt khách hàng thành công');
        setTimeout(() => {
          reload();
        }, 500);
      },
      () => {
        dispatch(hideModal());
        showError('Nhận lốt khách hàng thất bại');
      },
      () => dispatch(showLoading()),
    );
  },[dispatch, fb, profile]);

  const buttonView = useMemo(() => {
    if (fb.getStatusValue() === FeedbackStatus.IN_PROGRESS) {
      return (
        <>
          <ButtonActionFeedback
            onPress={onPressNotBuy}
            text="Không mua"
            textType="h5"
            textWeight="medium"
            type="plain"
            containerStyle={style.buttonContainerStyle}
          />
          <ButtonActionFeedback
            onPress={onPressBuy}
            text="Mua hàng"
            textType="h5"
            textWeight="medium"
            type="success"
            containerStyle={style.buttonContainerStyle}
          />
        </>
      );
    }
    if (fb.getStatusValue() === FeedbackStatus.EMPTY_ADVISOR) {
      return (
        <>
          <ButtonActionFeedback
            onPress={onPressConfirm}
            text="Nhận"
            textType="h5"
            textWeight="medium"
            type="primary"
            containerStyle={style.buttonContainerStyle}
          />
        </>
      );
    }
    if (fb.getStatusValue() === FeedbackStatus.PENDING) {
      return (
        <>
          <ButtonActionFeedback
            onPress={onPressCancel}
            text="Từ chối"
            textType="h5"
            textWeight="medium"
            type="plain"
            containerStyle={style.buttonContainerStyle}
          />
          <ButtonActionFeedback
            onPress={onPressConfirm}
            text="Tiếp khách"
            textType="h5"
            textWeight="medium"
            type="primary"
            containerStyle={style.buttonContainerStyle}
          />
        </>
      );
    }
  }, [fb, behaviorPopupNotBuyByPopupRef]);

  const allowDelete = useMemo(() => {
    return profile?.checkPermissionByKey(FEEDBACK_PERMISSIONS.EDITOR);
  }, [profile]);

  return (
    <TouchableOpacity
      disabled={fb.getDeleted()}
      style={style.cardElement}
      onPress={() => {
        navigation.navigate(MainRouteConfig.FeedbackDetail, {
          feedbackId: fb.getId(),
          firstDate,
          secondDate,
        });
      }}>
      <View style={style.rowTitle}>
        <View>
          <View style={style.row}>
            <Typography
              style={style.idFeedback}
              text={fb.getCode()}
              textType="medium"
              type="h3"
            />
            <StatusTagView status={fb.getStatusValue()} />
          </View>
          <View style={[style.row, style.createdName]}>
            <Typography
              text={StringUtils.format('Người tạo: {0}', fb.getCreatedName())}
            />
          </View>
        </View>
        {allowDelete && !fb.getDeleted() && (
          <TouchableOpacity onPress={onPressAction}>
            <Image source={ic_dots_horizontal} />
          </TouchableOpacity>
        )}
      </View>
      <View style={style.rowDetail}>
        <View style={{width: '70%'}}>
          <Typography
            color={colors.secondary.o900}
            text={`CGTV :  ${fb.getAdvisorName()}`}
            textType="medium"
            numberOfLines={1}
          />
        </View>
        <View>
          <Typography
            color={colors.primary.o500}
            text={fb.getCreatedHourDate()}
            type="h5"
          />
        </View>
      </View>
      <Typography
        style={style.spaceTxt}
        color={colors.secondary.o900}
        text={StringUtils.format(
          '{0} người lớn, {1} trẻ em',
          fb.getNumberOfAdults(),
          fb.getNumberOfChildren(),
        )}
      />

      {fb.getStatusValue() === FeedbackStatus.NOT_BUY && (
        <View style={style.descriptionContainer}>
          <Typography
            color={colors.secondary.o900}
            text={'Lý do : '}
            textType="medium"
          />
          <Typography
            style={style.reason}
            numberOfLines={2}
            color={colors.secondary.o900}
            text={fb.getReasonsText()}
            textType="regular"
          />
        </View>
      )}
      {!fb.getDeleted() && <View style={style.rowButton}>{buttonView}</View>}
      <ModalActionView
        firstDate={firstDate}
        secondDate={secondDate}
        ref={modalRef}
        feedback={fb}
        reload={reload}
      />
      <BehaviorPopupNotBuyView
        ref={behaviorPopupNotBuyByPopupRef}
        onFinish={() => {
          onPressBehavior(
            behaviorPopupNotBuyByPopupRef.current?.keyBehaviorEntity
              .getKeyBehaviors()
              .filter(item => item.quantity) || [],
          );
        }}
        onCancel={() => {
          onPressBehavior(
            behaviorPopupNotBuyByPopupRef.current?.keyBehaviorEntity.getKeyBehaviors() ||
              [],
          );
        }}
        totalNumberPerson={fb.getAllPerson()}
      />
    </TouchableOpacity>
  );
};

export default CardSlotFeedback;
