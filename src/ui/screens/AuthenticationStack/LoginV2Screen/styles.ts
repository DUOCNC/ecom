import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {DimentionUtils} from 'common-ui';
import {Fonts} from 'assets/fonts';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: 'column',
    paddingHorizontal: normalize(16),
  },
  containerElement: {
    flex: 1,
    backgroundColor: Colors.White,
    flexDirection: 'column',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowLogo: {
    marginVertical: normalize(15),
    marginTop: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    // width: '100%',
  },

  marginTop16: {
    marginTop: normalize(16),
  },
  bottom: {
    marginVertical: normalize(10),
  },
  marginView: {
    flex: 1,
    alignContent: 'center',
    marginTop: normalize(28),
  },
  txtHello: {
    color: Colors.Blue,
  },
  btnRegister: {
    margin: 0,
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
  text: {
    color: '#2E3E5C',
  },
  subText: {
    textAlign: 'center',
    color: Colors.SubText2,
    fontSize: normalize(14),
    fontFamily: Fonts.Regular,
    lineHeight: normalize(22),
    marginBottom: DimentionUtils.scale(24),
  },
  loginButton: {
    marginTop: 0,
    backgroundColor: '#FCAF171F',
    borderRadius: 8,
  },
  title: {
    alignSelf: 'center',
    marginBottom: DimentionUtils.scale(16),
  },
  description: {
    alignSelf: 'center',
    paddingHorizontal: DimentionUtils.scale(20),
    textAlign: 'center',
    color: Colors.SubText2,
  },
  iconBtnLogin: {position: 'absolute', left: 16},
  txtRegister: {color: '#2E3E5C'},
});

export default style;
