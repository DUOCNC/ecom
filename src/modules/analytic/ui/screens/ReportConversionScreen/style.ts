import {colors} from 'assets/v2';
import {Dimensions, StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui/utils';
const cols = 2;
const marginHorizontal = 8;
const marginVertical = 8;
const width =
  Dimensions.get('window').width / cols - marginHorizontal * (cols + 1);

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContainer: {
    marginTop: DimentionUtils.scale(16),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  param: {
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(16),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  box: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: 60,
    justifyContent: 'center',
    backgroundColor: colors.primary.o25,
    borderRadius: DimentionUtils.scale(7),
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
  },
  rowValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
  },
  left: {},
  right: {},
  btnViewDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: DimentionUtils.scale(16),
    marginTop: DimentionUtils.scale(24),
  },
  tab: {
    height: DimentionUtils.scale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base.white,
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: DimentionUtils.scale(200),
    marginTop: DimentionUtils.scale(20),
  },
  viewChart: {
    minHeight: DimentionUtils.scale(100),
  },
  notDataChart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DimentionUtils.scale(100),
  },
  buttonContainer: {
    borderRadius: DimentionUtils.scale(20),
    paddingHorizontal: DimentionUtils.scale(20),
    paddingVertical: DimentionUtils.scale(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: DimentionUtils.scale(16),
  },
  onboardingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  icInformation: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: DimentionUtils.scale(2),
  },
});
