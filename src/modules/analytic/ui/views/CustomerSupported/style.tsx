import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const CustomerSupportedStyled = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    marginBottom: normalize(8),
  },
  header: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(6),
    marginTop: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(12),
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
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
    width: 26,
    height: 26,
    marginLeft: 4,
    marginBottom: normalize(2),
    alignSelf: 'center',
  },
  btnEdit: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  description: {
    color: Colors.Gray500,
  },
  rowDescription: {
    paddingTop: normalize(4),
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
  },
  viewIconWarning: {
    width: normalize(32),
    height: normalize(32),
    resizeMode: 'contain',
  },
  iconWarning: {
    width: '100%',
    height: '100%',
  },
});

export {CustomerSupportedStyled};
