import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const ReportRetailChartStyle = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: normalize(40),
  },
  labelX: {
    top: normalize(10),
    color: Colors.Gray500,
    marginLeft: normalize(-2),
    fontSize: normalize(12),
    width: normalize(50),
  },
});

const TooltipChartStyle = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: normalize(8),
    padding: normalize(8),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    flexWrap: 'wrap',
    // minWidth: normalize(88),
    marginBottom: 45,
    paddingHorizontal: normalize(12),
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  pt16: {
    marginTop: normalize(16),
    justifyContent: 'center',
  },
  iconAmount: {
    width: normalize(8),
    height: normalize(8),
    backgroundColor: '#7B7BD6',
    marginRight: normalize(8),
    borderRadius: normalize(25),
  },
  textAmount: {
    color: Colors.subText,
  },
  icon: {
    position: 'absolute',
    width: normalize(12),
    height: normalize(12),
    bottom: normalize(-5),
    backgroundColor: 'white',
    transform: [{rotate: '45deg'}],
  },
  barLast: {},
  icBarLast: {
    right: normalize(4),
  },
  isOneBar: {
    marginLeft: normalize(0),
    ic: {
      marginLeft: normalize(0),
    },
  },
});

export {ReportRetailChartStyle, TooltipChartStyle};
