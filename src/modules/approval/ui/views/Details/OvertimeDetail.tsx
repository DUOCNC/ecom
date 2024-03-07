import React from 'react';
import {View} from 'react-native';
import {DimentionUtils, Typography} from 'common-ui';
import {HrmApplications} from 'modules/approval/models/response';
import {colors} from 'assets/v2';
import ApplicationStatusView from '../ApplicationStatusView';
import {ThemeStyle} from 'assets/theme';
import {style} from './style';
import {DateUtils, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';

interface Props {
  hrmData: HrmApplications;
}
const OvertimeDetail: React.FC<Props> = ({hrmData}) => {
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
                text="Ngày làm thêm"
                color={colors.secondary.o500}
              />
              <Typography
                text={DateUtils.parseMoment(e.date, DateFormatPattern.DDMMYYYY)}
              />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Thời gian"
                color={colors.secondary.o500}
              />
              <Typography
                text={StringUtils.format('{0} - {1}', e.startTime, e.endTime)}
              />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Tổng giờ làm thêm"
                color={colors.secondary.o500}
              />
              <Typography text={e.hours} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Kiểu"
                color={colors.secondary.o500}
              />
              <Typography text={e.type || 'Tính công'} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Chốt"
                color={colors.secondary.o500}
              />
              <Typography text="Có" />
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

export default OvertimeDetail;
