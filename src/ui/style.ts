import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  Flash: {
    fontFamily: 'Roboto',
    fontSize: DimentionUtils.scaleFont(16),
  },
  updateView: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: '10%',
  },
  btnUpdate: {
    width: DimentionUtils.scale(200),
  },
  messageContainer: {
    paddingHorizontal: DimentionUtils.scale(15),
    alignItems: 'center',
  },
});

export default style;
