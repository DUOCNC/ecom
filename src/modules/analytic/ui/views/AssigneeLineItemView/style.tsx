import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import Size from 'assets/theme/size';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';

const AssigneeLineItemStyled = StyleSheet.create({
  rowItem: {
    paddingVertical: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: Size.DefaultToolbarHeight + DimentionUtils.scale(50),
  },
  avatarContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: DimentionUtils.scale(32),
    height: DimentionUtils.scale(32),
  },
  viewInfo: {
    marginHorizontal: DimentionUtils.scale(8),
    flex: 1,
  },
  detail: {
    marginTop: DimentionUtils.scale(2),
    flexDirection: 'column',
  },
  btnEdit: {
    marginTop: DimentionUtils.scale(6),
    alignSelf: 'flex-start',
  },
  value: {
    color: Colors.Blue,
  },
  label: {
    color: colors.secondary.o500,
  },
  separator: {
    marginTop: DimentionUtils.scale(12),
  },
});

export {AssigneeLineItemStyled};
