import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {Size} from 'assets/theme';

const ConversionCustomerDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    marginTop: normalize(8),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    paddingTop: 0,
    flex: 1,
  },
  textTag: {
    borderStyle: 'solid',
    borderColor: '#5858B6',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 12,
    color: '#5858B6',
    borderRadius: 15,
    backgroundColor: '#F0F0FE',
    overflow: 'hidden',
  },
  rowItem: {
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: Size.DefaultToolbarHeight + normalize(50),
  },
  viewInfo: {
    marginHorizontal: normalize(8),
    flex: 1,
  },
  accountCode: {
    marginTop: normalize(4),
    flexDirection: 'column',
  },
  avatarContainer: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  iconUser: {
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
  btnEdit: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  pickStore: {},
});

export {ConversionCustomerDetailStyle};
