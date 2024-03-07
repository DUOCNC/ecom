import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const TabHistoryStyle = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  rowLoading: {
    marginTop: normalize(24),
  },
  container: {
    flex: 1,
    marginHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(5),
    backgroundColor: colors.base.white,
  },
  textGroup: {
    marginTop: DimentionUtils.scale(16),
    marginHorizontal: DimentionUtils.scale(16),
  },
  body: {
    flex: 1,
    marginTop: normalize(8),
  },
  btnEmpty: {
    width: normalize(248),
  },
  txtCreate: {
    color: '#1656F1',
  },
  viewInput: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F5',
    marginHorizontal: normalize(24),
    paddingHorizontal: normalize(12),
    height: normalize(40),
    borderRadius: normalize(12),
    marginVertical: normalize(12),
    alignItems: 'center',
  },
  input: {
    marginLeft: normalize(8),
    flex: 1,
  },
  headerSearch: {
    paddingHorizontal: normalize(16),
    paddingTop: normalize(8),
    paddingBottom: normalize(16),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  viewLoading: {
    position: 'absolute',
    alignSelf: 'center',
    top: normalize(60),
    zIndex: 100000,
  },
  emptyView: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
  },
  summary: {
    backgroundColor: colors.base.white,
    borderRadius: DimentionUtils.scale(5),
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(8),
    height: DimentionUtils.scale(112),
    paddingHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(16),
  },
  summaryRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

export {TabHistoryStyle};
