import {DimentionUtils, Typography} from 'common-ui';
import {EnumTypeHrm} from 'modules/approval/config';
import {HrmList} from 'modules/approval/models/response';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ApplicationStatusView from '../ApplicationStatusView';
import {colors} from 'assets/v2';
import CTCheckbox from 'components/Form/CTCheckbox';

type SingleWordItemViewProps = {
  data: HrmList;
  type: EnumTypeHrm;
  showReason?: boolean; // FIXME: This might change
  showStatus?: boolean;
  isChecked: boolean;
  onClick: (item: HrmList) => void;
  onSelect: (item: HrmList, checked: boolean) => void;
};
const ApplicationItemView: React.FC<SingleWordItemViewProps> = ({
  data,
  type,
  onClick,
  showReason,
  showStatus,
  isChecked,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      key={data.id}
      style={style.container}
      onPress={() => {
        onClick(data);
      }}>
      <View style={[style.row1]}>
        <Typography text={data.appSubObject} textType="medium" />
        {data.appApprovalStatus !== 'Chờ duyệt' || showStatus ? (
          <ApplicationStatusView
            type={data.appApprovalStatus}
            value={data.appApprovalStatus}
          />
        ) : (
          <CTCheckbox
            disabled={false}
            value={isChecked}
            onValueChange={value => {
              onSelect(data, !value);
            }}
          />
        )}
      </View>
      <View style={style.row2}>
        <Typography
          textType="medium"
          text={`${data.personnelCode} - ${data.personnelName}`}
        />
      </View>
      <View style={[style.row3, style.row]}>
        <Typography
          color={colors.secondary.o500}
          text={`Ngày tạo: ${data.dateCreated}`}
        />
      </View>
      {showReason && (
        <View style={[style.row3, style.row]}>
          <Typography
            color={colors.secondary.o500}
            text={`Lý do: ${data.reason ?? ''}`}
          />
        </View>
      )}
      <View style={[style.row3, style.row]}>
        <Typography
          lineHeight={20}
          color={colors.secondary.o500}
          text={`Mô tả: ${data.desc || ''}`}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(8),
    shadowColor: '#A8A8A8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    marginHorizontal: DimentionUtils.scale(4),
    paddingVertical: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
    backgroundColor: colors.base.white,
  },
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(8)},
  row1: {justifyContent: 'space-between', flexDirection: 'row'},
  row2: {},
  row3: {},
});
export default ApplicationItemView;
