import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {normalize} from 'utils/DimensionsUtils';
import {colors} from 'assets/v2';

const style = StyleSheet.create({
  body: {
    padding: DimentionUtils.scale(16),
  },
  titleCountView: {
    marginTop: DimentionUtils.scale(8),
    marginBottom: DimentionUtils.scale(16),
  },
  titleAssignee: {
    marginTop: DimentionUtils.scale(24),
    marginBottom: DimentionUtils.scale(16),
  },
  titleCustomer: {
    marginTop: DimentionUtils.scale(32),
    marginBottom: DimentionUtils.scale(16),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DimentionUtils.scale(20),
  },
  text: {
    marginLeft: normalize(10),
  },
  icon: {
    marginLeft: DimentionUtils.scale(4),
    alignSelf: 'center',
    height: 28,
  },
  reasonBox: {
    flexDirection: 'row',
    borderRadius: DimentionUtils.scale(5),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    height: DimentionUtils.scale(45),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(16),
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
  },

  titleReasonDetail: {
    marginTop: DimentionUtils.scale(34),
    marginBottom: DimentionUtils.scale(16),
  },

  titleReason: {
    marginTop: DimentionUtils.scale(14),
    marginBottom: DimentionUtils.scale(16),
  },
  reasonInput: {
    borderWidth: 1,
    borderRadius: DimentionUtils.scale(5),
    borderColor: colors.secondary.o200,
    paddingTop: DimentionUtils.scale(12),
    paddingBottom: DimentionUtils.scale(12),
    paddingHorizontal: DimentionUtils.scale(16),
    fontSize: DimentionUtils.scale(14),
    color: colors.secondary.o600,
    height: 80,
    textAlignVertical: 'top',
  },
  avoidingView: {
    flex: 1,
  },
  titleRequireContainer: {
    flexDirection: 'row',
  },
  require: {
    marginLeft: DimentionUtils.scale(5),
  },
  createDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleDate: {
    marginLeft: DimentionUtils.scale(8),
  },
});

export default style;
