import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: normalize(10),
  },
  rowTitle: {
    alignItems: 'center',
    marginTop: normalize(16),
  },
  rowMessage: {
    marginTop: normalize(8),
    paddingHorizontal: '3%',
  },
  txtMessage: {
    textAlign: 'center',
  },
  txtTitle: {
    fontSize: normalize(16),
  },
  rowButton: {
    marginTop: normalize(16),
    flexDirection: 'row',
    borderTopWidth: normalize(1),
    borderTopColor: Colors.Border,
  },
  center: {
    width: normalize(1),
    height: '100%',
    backgroundColor: Colors.Border,
  },
  txtButton: {
    fontSize: normalize(14),
  },
  txtCancel: {
    color: Colors.Error,
  },
  txtOk: {
    color: Colors.Primary,
  },
  btn: {
    flex: 1,
  },
});

export default styles;
