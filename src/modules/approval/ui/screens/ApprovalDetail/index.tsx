import {TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, Typography} from 'common-ui';
import {style} from './style';
import {ScrollView} from 'react-native-gesture-handler';
import {useHrmData} from 'modules/approval/hooks';
import {EnumTypeHrm} from 'modules/approval/config';
import {HrmApplications} from 'modules/approval/models/response';
import LeaveDetail from '../../views/Details/LeaveDetail';
import AbsenceDetail from '../../views/Details/AbsenceDetail';
import CheckInOutDetail from '../../views/Details/CheckInOutDetail';
import ResignDetail from '../../views/Details/ResignDetail';
import ShiftChangeDetail from '../../views/Details/ShiftChangeDetail';
import ShiftMoresDetail from '../../views/Details/ShiftMoresDetail';
import OvertimeDetail from '../../views/Details/OvertimeDetail';
import OnsiteDetail from '../../views/Details/OnsiteDetail';
import LoadingView from 'components/CTLoadingView';
import {colors} from 'assets/v2';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import {useAuth} from 'providers/contexts/AuthContext';
import ModalConfirmApplicationView, {
  ModalConfirmApplicationRef,
} from '../../views/ModalConfirmApplicationView';
import {ic_application_approval, ic_application_remove} from 'assets/images';
import {MainRouteConfig} from 'config/RouteConfig';

type Props = MainStackScreenProps<'ApprovalDetail'>;
const ApprovalDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {id, type} = route.params;
  const {profile} = useAuth();
  const modalRef = React.createRef<ModalConfirmApplicationRef>();

  const {
    loading,
    submitting,
    removeRequest,
    approveRequest,
    rejectRequest,
    hrmData,
  } = useHrmData(id, type as EnumTypeHrm);

  const [msg, setMsg] = useState<string>('');
  const [error, setError] = useState<ErrorType | false>(false);
  const [isApproval, setIsApproval] = useState<boolean>(false);

  const canApproveOrReject = profile?.fullName === hrmData?.appApprovalIds;

  const hasAction =
    hrmData &&
    hrmData.appApprovalStatus !== 'Đã duyệt' &&
    hrmData.appApprovalStatus !== 'Không duyệt';

  const handleCancelModal = useCallback(() => {
    modalRef.current?.close();
    navigation.reset({
      index: 0,
      routes: [{name: MainRouteConfig.Main}, {name: MainRouteConfig.Approval}],
    });
  }, [modalRef, navigation]);

  const handleApproveOrReject = useCallback(
    async (action: 'approve' | 'reject') => {
      if (action === 'approve') {
        await approveRequest();
      } else {
        await rejectRequest();
      }

      modalRef.current?.close();
    },
    [approveRequest, modalRef, rejectRequest],
  );

  const confirmDelete = useCallback(async () => {
    modalRef.current?.close();
    await removeRequest();

    handleCancelModal();
  }, [handleCancelModal, modalRef, removeRequest]);

  const modalView = useMemo(() => {
    if (canApproveOrReject) {
      if (isApproval) {
        return (
          <ModalConfirmApplicationView
            ref={modalRef}
            title="Duyệt đơn"
            subTitle="Bạn xác nhận duyệt đơn này?"
            icon={ic_application_approval}
            onConfirm={() => {
              handleApproveOrReject('approve');
            }}
          />
        );
      }
      return (
        <ModalConfirmApplicationView
          title="Không duyệt"
          subTitle="Bạn không duyệt đơn này?"
          icon={ic_application_remove}
          ref={modalRef}
          onConfirm={() => {
            handleApproveOrReject('reject');
          }}
        />
      );
    }
    if (hasAction) {
      return (
        <ModalConfirmApplicationView
          title="Xóa đơn"
          subTitle="Bạn xác nhận xóa đơn này?"
          icon={ic_application_remove}
          ref={modalRef}
          onConfirm={confirmDelete}
        />
      );
    }
    return <View />;
  }, [
    canApproveOrReject,
    hasAction,
    isApproval,
    modalRef,
    handleApproveOrReject,
    confirmDelete,
  ]);

  useEffect(() => {
    //get data
  }, []);

  if (!hrmData || submitting) {
    return <Layout.Loading loading={true} />;
  }

  const renderContent = (hrm: HrmApplications) => {
    switch (type) {
      case EnumTypeHrm.LEAVES:
        return <LeaveDetail hrmData={hrm} />;
      case EnumTypeHrm.ABSENCE:
        return <AbsenceDetail hrmData={hrm} />;
      case EnumTypeHrm.CHECKOUTS:
        return <CheckInOutDetail hrmData={hrm} />;
      case EnumTypeHrm.RESIGNATION:
        return <ResignDetail hrmData={hrm} />;
      case EnumTypeHrm.SHIFT_MORES:
        return <ShiftMoresDetail hrmData={hrm} />;
      case EnumTypeHrm.SHIFTCHANGE:
        return <ShiftChangeDetail hrmData={hrm} />;
      case EnumTypeHrm.OVERTIME:
        return <OvertimeDetail hrmData={hrm} />;
      case EnumTypeHrm.ONSITE:
        return <OnsiteDetail hrmData={hrm} />;

      default:
        return <LoadingView />;
    }
  };

  const buttonContent = () => {
    if (canApproveOrReject && hasAction) {
      return (
        <Layout.ScreenBottom>
          <View style={style.viewBottom}>
            <CTButton
              type="grey"
              style={style.reject}
              onPress={() => {
                setIsApproval(false);
                modalRef.current?.open();
              }}
              text="Không duyệt"
              font={Font.Medium}
            />
            <CTButton
              style={{flex: 1}}
              onPress={() => {
                setIsApproval(true);
                modalRef.current?.open();
              }}
              text="Duyệt"
              font={Font.Medium}
            />
          </View>
        </Layout.ScreenBottom>
      );
    }
    if (hasAction) {
      return (
        <Layout.ScreenBottom>
          <View style={style.viewBottom}>
            <CTButton
              buttonType="destruction"
              type="grey"
              onPress={() => {
                modalRef.current?.open();
              }}
              text="Xóa đơn"
              font={Font.Medium}
              style={{flex: 1}}
            />
          </View>
        </Layout.ScreenBottom>
      );
    }
    return;
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack
        title="Chi tiết đơn từ"
        right={
          hasAction && (
            <TouchableOpacity
              style={style.rightTitleContainer}
              onPress={() => {
                navigation.navigate(MainRouteConfig.ApprovalUpdate, {
                  id: id,
                  type: type,
                });
              }}>
              <Typography
                style={style.rightTitle}
                text="Sửa"
                textType="medium"
                type="h3"
                color={colors.primary.o500}
              />
            </TouchableOpacity>
          )
        }
      />
      <Layout.SafeAreaContainer edges={['bottom']}>
        <View style={style.container}>
          <Layout.Loading loading={loading ?? true}>
            <Layout.Error error={error}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {renderContent(hrmData)}
              </ScrollView>
            </Layout.Error>
          </Layout.Loading>
        </View>
        {buttonContent()}
        {modalView}
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};
export default ApprovalDetailScreen;
