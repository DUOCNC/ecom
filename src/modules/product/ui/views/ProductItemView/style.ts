import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
  },
  containerImage: {
    width: DimentionUtils.scale(80),
    height: DimentionUtils.scale(100),
    marginRight: DimentionUtils.scale(12),
  },
  image: {
    flex: 1,
    borderRadius: DimentionUtils.scale(5),
  },
  containerInfo: {
    flex: 1,
  },
  txt: {
    width: '100%',
  },
  marginTop: {
    marginTop: DimentionUtils.scale(4),
  },
});

export default style;
