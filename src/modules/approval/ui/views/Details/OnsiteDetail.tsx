import React from 'react';
import {View} from 'react-native';
import {DimentionUtils, Typography} from 'common-ui';
import {HrmApplications, HrmDetail} from 'modules/approval/models/response';
import {colors} from 'assets/v2';
import ApplicationStatusView from '../ApplicationStatusView';
import {ThemeStyle} from 'assets/theme';
import {style} from './style';
import {DateUtils, NumberUtils, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';

interface Props {
  hrmData: HrmApplications;
}
const OnsiteDetail: React.FC<Props> = ({hrmData}) => {
  const {detail = [], surcharges = []} = hrmData;
  if (detail.length === 0) {
    detail.push({
      dateFrom: DateUtils.parseMoment(
        hrmData.dateFrom,
        DateFormatPattern.DDMMYYYY,
      ),
      dateTo: DateUtils.parseMoment(hrmData.dateTo, DateFormatPattern.DDMMYYYY),
      timeStart: DateUtils.parseMoment(hrmData.timeStart, 'HH:mm'),
      timeEnd: DateUtils.parseMoment(hrmData.timeEnd, 'HH:mm'),
      dateCreated: DateUtils.parseMoment(
        hrmData.dateCreated,
        DateFormatPattern.DDMMYYYY,
      ),
    } as unknown as HrmDetail);
  }

  const totalCost = surcharges.reduce(
    (total, surcharge) => total + parseInt((surcharge.money as string) || '0'),
    0,
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
          text="Hình thức công tác"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.isWorkAbroad} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Phương tiện"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.vehicleId} />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Phụ phí"
          color={colors.secondary.o500}
        />
        <Typography
          text={`${totalCost?.toLocaleString() || '-'} ${
            surcharges[0]?.type || 'VND'
          }`}
        />
      </View>
      <View style={[style.row]}>
        <Typography
          style={style.label}
          text="Địa điểm"
          color={colors.secondary.o500}
        />
        <Typography text={hrmData.address} />
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
                text="Từ"
                color={colors.secondary.o500}
              />
              <Typography
                text={StringUtils.format('{0} {1}', e.timeStart, e.dateFrom)}
              />
            </View>
            <View style={[style.row]}>
              <Typography
                style={style.label}
                text="Đến"
                color={colors.secondary.o500}
              />
              <Typography
                text={StringUtils.format('{0} {1}', e.timeEnd, e.dateTo)}
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

      <View style={[style.detailItem]}>
        <View style={[style.titleGroup, {paddingTop: DimentionUtils.scale(6)}]}>
          <Typography text="PHỤ PHÍ CÔNG TÁC" textType="medium" />
        </View>
        <View style={[ThemeStyle.separator, style.separator]} />
        {surcharges.map((e, index) => {
          return (
            <View key={index} style={[style.row]}>
              <Typography
                style={style.label}
                text={e.name}
                color={colors.secondary.o500}
              />
              <Typography
                text={StringUtils.format(
                  '{0} {1}',
                  NumberUtils.formatCurrencyWithoutCurrency(
                    (e.money as number) ?? 0,
                  ),
                  e.type || 'VND',
                )}
              />
            </View>
          );
        })}
      </View>

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

export default OnsiteDetail;
