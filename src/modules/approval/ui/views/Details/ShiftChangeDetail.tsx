import React from 'react';
import {View} from 'react-native';
import {DimentionUtils, Typography} from 'common-ui';
import {HrmApplications} from 'modules/approval/models/response';
import {colors} from 'assets/v2';
import ApplicationStatusView from '../ApplicationStatusView';
import {ThemeStyle} from 'assets/theme';
import {style} from './style';

interface Props {
  hrmData: HrmApplications;
}
const ShiftChangeDetail: React.FC<Props> = ({hrmData}) => {
  const {detail = []} = hrmData;

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
          text="Trạng thái đơn từ"
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
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Ý kiến người duyệt"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.commentApproved} />
      </View>
      {detail.map((e, index) => {
        const isSwappingShiftWithOther = e.partnerId !== '0'; // FIXME:
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
                text="Kiểu đổi ca"
                color={colors.secondary.o500}
              />
              <Typography
                text={isSwappingShiftWithOther ? 'Người khác' : 'Chính mình'}
              />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Ngày cần đổi"
                color={colors.secondary.o500}
              />
              <Typography text={e.dateChange} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Ca cần đổi"
                color={colors.secondary.o500}
              />
              <Typography text={e.codeShiftchange} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Ca muốn làm"
                color={colors.secondary.o500}
              />
              <Typography text={e.codeShiftother} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Người đổi"
                color={colors.secondary.o500}
              />
              <Typography
                text={
                  isSwappingShiftWithOther ? (e.partnerId as string) : 'Không'
                }
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

export default ShiftChangeDetail;
