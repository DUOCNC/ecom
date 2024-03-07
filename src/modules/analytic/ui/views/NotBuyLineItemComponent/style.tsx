import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {Size} from 'assets/theme';
import {Colors} from 'assets/colors';

const NotBuyLineItemStyled = StyleSheet.create({
  rowItem: {
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: Size.DefaultToolbarHeight + normalize(50),
  },
  avatarContainer: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  viewInfo: {
    marginHorizontal: normalize(8),
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Gray200,
    paddingBottom: 12,
  },
  accountCode: {
    marginTop: normalize(4),
    flexDirection: 'column',
  },
  btnEdit: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  value: {
    fontWeight: '500',
    color: Colors.Blue,
  },
  greenTextBold: {
    color: Colors.Green,
    fontWeight: '500',
  },
  redTextBold: {
    color: Colors.Red,
    fontWeight: '500',
  },
});

export {NotBuyLineItemStyled};
