import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui/utils';
import {StyleSheet} from 'react-native';

const ConversionCustomerDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    marginTop: DimentionUtils.scale(8),
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    paddingTop: 0,
    flex: 1,
  },
  tag: {
    borderStyle: 'solid',
    borderColor: colors.primary.o400,
    borderWidth: DimentionUtils.scale(1),
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(12),
    color: colors.primary.o400,
    borderRadius: DimentionUtils.scale(15),
    backgroundColor: colors.primary.o50,
    overflow: 'hidden',
  },
  textTag: {
    color: colors.primary.o400,
  },
  rowItem: {
    paddingVertical: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: Size.DefaultToolbarHeight + DimentionUtils.scale(50),
  },
  viewInfo: {
    marginHorizontal: DimentionUtils.scale(8),
    flex: 1,
  },
  accountCode: {
    marginTop: DimentionUtils.scale(4),
    flexDirection: 'column',
  },
  avatarContainer: {
    marginTop: DimentionUtils.scale(6),
    alignSelf: 'flex-start',
  },
  avatar: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
  },
  iconUser: {
    width: DimentionUtils.scale(35),
    height: DimentionUtils.scale(35),
    alignSelf: 'center',
  },
  btnEdit: {
    marginTop: DimentionUtils.scale(6),
    alignSelf: 'flex-start',
  },
  empty: {
    flex: 1,
    marginTop: DimentionUtils.scale(20),
    alignItems: 'center',
  },
});

export {ConversionCustomerDetailStyle};
