import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  createdDate: {
    flexDirection: 'row',
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
  },
  content: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  title: {
    paddingTop: DimentionUtils.scale(4),
  },
  mainContent: {
    marginVertical: DimentionUtils.scale(12),
  },
  pStyle: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: DimentionUtils.scale(14),
    padding: 0,
    margin: 0,
    lineHeight: DimentionUtils.scale(18),
  },
  body: {
    fontSize: DimentionUtils.scaleFont(14),
    color: colors.secondary.o900,
  },
  headerTitle: {
    marginTop: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(4),
    marginBottom: DimentionUtils.scale(16),
  },
  newsOrther: {
    marginTop: DimentionUtils.scale(16),
  },
  fileContent: {
    marginVertical: DimentionUtils.scale(8),
  },
});

export {style};
