import React from 'react';
import {View} from 'react-native';
import {DimentionUtils, Typography} from 'common-ui';
import {HrmApplications, HrmDetail} from 'modules/approval/models/response';
import {colors} from 'assets/v2';
import ApplicationStatusView from '../ApplicationStatusView';
import {ThemeStyle} from 'assets/theme';
import {DateFormatPattern} from 'common/enums';
import {DateUtils} from 'common';
import {style} from './style';

interface Props {
  hrmData: HrmApplications;
}
const dateFormatString = DateFormatPattern.DDMMYYYY;

const ResignDetail: React.FC<Props> = ({hrmData}) => {
  const {detail = []} = hrmData;
  if (!detail?.length) {
    detail.push({
      dateCreated: DateUtils.parseMoment(hrmData.dateCreated, dateFormatString),
      dateOfApplication: DateUtils.parseMoment(
        hrmData.dateOfApplication,
        dateFormatString,
      ),
      date: DateUtils.parseMoment(hrmData.date, dateFormatString),
    } as unknown as HrmDetail);
  }

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
          text="Lý do"
          color={colors.secondary.o500}
        />
        <Typography style={style.value} lineHeight={22} text={hrmData.reason} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Mô tả lý do"
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
                text="Ngày nghỉ"
                color={colors.secondary.o500}
              />
              <Typography text={e.date} />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Ngày nộp đơn"
                color={colors.secondary.o500}
              />
              <Typography text={e.dateOfApplication} />
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

export default ResignDetail;
