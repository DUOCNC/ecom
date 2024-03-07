import {StyleSheet} from 'react-native';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';

const SamePeriodStyled = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.Gray200,
    marginBottom: 20,
    borderRadius: normalize(8),
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: Colors.White,
  },
  progress: {
    marginTop: 8,
  },
  titleNow: {
    fontWeight: '500',
    color: Colors.Blue,
    marginBottom: 8,
    marginTop: 8,
  },
  titlePrevious: {
    fontWeight: '500',
    color: Colors.Gray500,
    marginBottom: 8,
    marginTop: 16,
  },
  descriptionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.Gray200,
  },
  progressContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 20,
    // flex:1,
  },
  description: {
    color: Colors.Blue,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {},
  unit: {
    marginLeft: 4,
    color: Colors.Gray500,
    paddingBottom: normalize(2),
  },
  titleGroup: {flexDirection: 'row'},
  iconAttention: {
    marginBottom: normalize(0),
  },
  iconRate: {paddingBottom: normalize(4)},
  row: {flexDirection: 'row', alignItems: 'flex-end'},
});

export {SamePeriodStyled};
