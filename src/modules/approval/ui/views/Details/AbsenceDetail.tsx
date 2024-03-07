import React from 'react';
import {View} from 'react-native';
import {DimentionUtils, Typography} from 'common-ui';
import {HrmApplications} from 'modules/approval/models/response';
import {colors} from 'assets/v2';
import ApplicationStatusView from '../ApplicationStatusView';
import {ThemeStyle} from 'assets/theme';
import {useReasonData} from 'modules/approval/hooks';
import {AbsenceReason} from 'modules/approval/models/response/reasons';
import {EnumTypeHrm} from 'modules/approval/config';
import {style} from './style';

interface Props {
  hrmData: HrmApplications;
}
const AbsenceDetail: React.FC<Props> = ({hrmData}) => {
  const {detail = []} = hrmData;
  const {reasons} = useReasonData<AbsenceReason>(
    hrmData.appSubObjectCode as EnumTypeHrm,
  );

  return (
    <View>
      <View style={[style.titleGroup]}>
        <Typography text="THÔNG TIN CHUNG" textType="medium" />
      </View>
      <View style={[ThemeStyle.separator, style.separator]} />
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Họ tên"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.personnelName} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Mã nhân viên"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.personnelCode} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Phòng ban"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.departmentId} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Vị trí làm việc"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.positionId} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Chức vụ"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.jobTitle} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Trạng thái đơn"
          color={colors.secondary.o500}
        />
        <ApplicationStatusView
          type={hrmData.appApprovalStatus}
          value={hrmData.appApprovalStatus}
        />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Mô tả"
          color={colors.secondary.o500}
        />
        <Typography style={style.value} lineHeight={22} text={hrmData.desc} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Người duyệt"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.appApprovalIds} />
      </View>
      {detail.map((e, index) => {
        const appReason = reasons?.find(reason => reason.title === e.reason);
        return (
          <View
            key={index}
            style={[
              style.detailItem,
              index === 0 && {marginTop: DimentionUtils.scale(30)},
            ]}>
            <View style={[style.titleGroup]}>
              <Typography text="CHI TIẾT THỜI GIAN" textType="medium" />
            </View>
            <View style={[ThemeStyle.separator, style.separator]} />
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Ngày vắng mặt"
                color={colors.secondary.o500}
              />
              <Typography text={e.dateStart} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Từ"
                color={colors.secondary.o500}
              />
              <Typography text={e.timeStart} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Đến"
                color={colors.secondary.o500}
              />
              <Typography text={e.timeEnd} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Tính công"
                color={colors.secondary.o500}
              />
              <Typography
                text={appReason?.hasAttendance === '1' ? 'Có' : 'Không'}
              />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Yêu cầu chốt"
                color={colors.secondary.o500}
              />
              <Typography
                text={appReason?.requiredFinger === '1' ? 'Có' : 'Không'}
              />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Ngày tạo đơn"
                color={colors.secondary.o500}
              />
              <Typography text={hrmData.dateCreated} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Lý do"
                color={colors.secondary.o500}
              />
              <Typography text={hrmData.reason} />
            </View>
          </View>
        );
      })}
      {/* <View style={style.row}>
        <Typography
          style={style.label}
          text="Đính kèm"
          color={colors.secondary.o500}
        />
      </View>
      <View style={[style.attached]}>
        <View style={style.attachedEmpty}>
          <EmptyAttached icon={bg_empty_attached} title="Không có đính kèm" />
        </View>
      </View> */}
    </View>
  );
};

export default AbsenceDetail;
