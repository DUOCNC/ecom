import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const TabOtherStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  btTop: {
    width: '100%',
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginBottom: normalize(20),
  },
  viewMenu: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    height: Size.DefaultToolbarHeight + normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeader: {
    color: Colors.White,
  },
  rowProfile: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(100),
  },
  viewStore: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInfo: {
    marginHorizontal: normalize(8),
    flex: 1,
  },
  menu: {
    backgroundColor: Colors.White,
  },
  itemMenu: {
    flexDirection: 'row',
    height: normalize(48),
    width: '100%',
    paddingHorizontal: normalize(18),
    alignItems: 'center',
  },
  txtMenu: {
    marginHorizontal: normalize(12),
    flex: 1,
    color: Colors.Text,
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
  },
  marginTop: {
    marginTop: normalize(8),
  },
  btnLogout: {
    marginTop: normalize(20),
    backgroundColor: Colors.White,
    height: normalize(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(16),
    borderRadius: normalize(5),
    borderColor: Colors.Blue,
    borderWidth: normalize(1),
    marginBottom: normalize(20),
  },
  txtLogout: {
    color: Colors.Blue,
  },
  title: {
    height: normalize(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
  },
  content: {
    paddingTop: normalize(10),
    flex: 1,
  },
  note: {
    backgroundColor: '#F0F0FE',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    color: Colors.Gray900,
  },
  btClose: {
    marginHorizontal: normalize(16),
    marginBottom: normalize(12),
  },
  circleStyle: {
    width: 20,
    height: 20,
    borderColor: '#000',
    borderWidth: 0.8,
    marginRight: 10,
    fillColor: Colors.ActiveRadioGroup,
  },
});

const TabOtherAccountStyle = StyleSheet.create({
  accountCode: {
    marginTop: normalize(4),
    flexDirection: 'row',
  },
  white: {
    color: Colors.White,
  },
  icon: {
    tintColor: Colors.White,
  },
});

const DeleteAccountStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: normalize(48),
    alignItems: 'center',
  },
  icon: {marginTop: normalize(4)},
  text: {
    marginLeft: normalize(10),
  },
});

export {TabOtherStyle, TabOtherAccountStyle, DeleteAccountStyle};
