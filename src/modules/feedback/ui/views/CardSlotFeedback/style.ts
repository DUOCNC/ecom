import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  cardElement: {
    marginBottom: DimentionUtils.scale(11),
    padding: DimentionUtils.scale(12),
    backgroundColor: colors.base.white,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 2,
    shadowColor: colors.base.black,
    borderColor: colors.secondary.o300,
    borderRadius: DimentionUtils.scale(12),
    borderWidth: 1,
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(12),
    borderBottomColor: '#E8EAEB',
  },
  rowDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceTxt: {
    marginTop: DimentionUtils.scale(8),
  },
  row: {
    flexDirection: 'row',
  },
  idFeedback: {
    marginRight: DimentionUtils.scale(8),
    alignSelf: 'center',
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: DimentionUtils.scale(12),
  },
  buttonContainerStyle: {
    borderRadius: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(10),
    width: DimentionUtils.scale(100),
  },
  buttonStyle: {
    height: DimentionUtils.scale(32),
    borderRadius: DimentionUtils.scale(8),
    padding: DimentionUtils.scale(4),
  },
  textButton: {
    fontWeight: 'bold',
    color: '',
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(5),
  },
  reason: {
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: DimentionUtils.scale(5),
  },
  createdName: {
    marginTop: DimentionUtils.scale(4),
  },
});

export default style;
