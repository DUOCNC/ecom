import {Colors} from 'assets/colors';
import {Size} from 'assets/theme';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: 'column',
    paddingHorizontal: Size.DefaultHorizontal,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowLogo: {
    marginVertical: normalize(15),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(24),
  },
  imgLogo: {
    width: normalize(153.47),
  },
  policy: {
    marginBottom: normalize(5),
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
});

export {RegisterStyle};
