import {Colors} from 'assets/colors';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: DimentionUtils.scale(1),
    backgroundColor: Colors.White,
    justifyContent: 'center',
  },
  body: {
    flex: DimentionUtils.scale(1),
  },
  textFooter: {
    color: Colors.Gray500,
  },
  valueRevenue: {
    color: Colors.Error500,
  },
  filter: {
    flex: DimentionUtils.scale(1),
    marginTop: DimentionUtils.scale(18),
    marginBottom: DimentionUtils.scale(24),
    marginHorizontal: DimentionUtils.scale(16),
  },
  pickStore: {},
});

export {Styles};
