import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: 'column',
    paddingHorizontal: normalize(16),
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowLogo: {
    marginVertical: normalize(15),
    marginTop: '13%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(24),
  },
  imgLogo: {
    width: normalize(153.47),
  },

  marginTop16: {
    marginTop: normalize(16),
  },
  bottom: {
    marginVertical: normalize(10),
  },
  marginView: {
    marginTop: normalize(28),
  },
  txtHello: {
    color: Colors.Blue,
  },
  btnRegister: {
    marginTop: normalize(10),
  },
  support: {
    marginTop: normalize(24),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  supportText: {
    color: Colors.Blue,
  },
});

export {LoginStyle};
