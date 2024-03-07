import {Colors} from 'assets/colors';
import {Platform, StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const Styles = StyleSheet.create({
  customerMetrics: {
    borderRadius: normalize(8),
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(16),
    marginHorizontal: normalize(16),
    backgroundColor: Colors.Primary25,
    marginBottom: 20,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  customerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  left: {flexDirection: 'row', alignItems: 'center'},
  icon: {
    marginRight: normalize(8),
  },
  iconMore: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: Colors.Gray500,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  customerBody: {
    flexDirection: 'row',
    paddingLeft: 4,
    // height: normalize(32),
    alignItems: 'baseline',
  },
  textBody: {},
  textUniBody: {
    marginLeft: normalize(8),
    color: Colors.Gray500,
    lineHeight: 17,
  },
  customerFooter: {flexDirection: 'row', marginTop: 8, paddingLeft: 4},
  textFooter: {
    color: Colors.Gray500,
  },
  iconAttention: {},
});

export {Styles};
