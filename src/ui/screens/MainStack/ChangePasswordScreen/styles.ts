import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ChangePasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: normalize(1),
  },
  body: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingTop: normalize(16),
  },
  rowInput: {
    paddingHorizontal: normalize(16),
    marginBottom: normalize(16),
  },
  rowButton: {
    paddingHorizontal: normalize(16),
    marginBottom: normalize(24),
  },
});

export {ChangePasswordStyle};
