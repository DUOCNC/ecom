import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.secondary.o50,
  },
  txtValue: {
    maxWidth: '55%',
    textAlign: 'right',
  },
  card: {
    backgroundColor: colors.base.white,
  },
  cardHeader: {
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(8),
  },
  headerTile: {
    flex: 1,
  },
  viewImage: {
    marginHorizontal: DimentionUtils.scale(8),
    width: DimentionUtils.scale(24),
    alignItems: 'center',
  },
  viewInfo: {
    marginTop: DimentionUtils.scale(12),
  },
  btnEdit: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DimentionUtils.scale(8),
  },
  cardBody: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(4),
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DimentionUtils.scale(32),
    marginBottom: DimentionUtils.scale(12),
    alignItems: 'flex-start',
  },
  btnMenu: {
    backgroundColor: colors.base.white,
    height: DimentionUtils.scale(48),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimentionUtils.scale(8),
    elevation: 8,
  },
  btnTitle: {
    flex: 1,
  },
  viewRight: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: DimentionUtils.scale(8),
  },
  topBtnMenu: {
    marginTop: DimentionUtils.scale(12),
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: colors.secondary.o300,
  },
  cardOverView: {
    flex: 1,
    backgroundColor: colors.blue.o700,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCard: {
    flex: 1.3,
    height: 80,
    backgroundColor: colors.blue.o600,
    width: '100%',
  },
  bottomCard: {
    flex: 2,
    backgroundColor: colors.base.white,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: DimentionUtils.scale(44),
    paddingBottom: DimentionUtils.scale(14),
  },
  avatar: {
    position: 'absolute',
    top: DimentionUtils.scale(35),
    backgroundColor: colors.secondary.o300,
    borderRadius: DimentionUtils.scale(100),
    borderWidth: DimentionUtils.scale(4),
    borderColor: colors.base.white,
    width: DimentionUtils.scale(80),
    height: DimentionUtils.scale(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAvatar: {
    width: 35,
    height: 35,
  },
  textName: {
    marginBottom: DimentionUtils.scale(4),
  },
  textPosition: {
    marginBottom: DimentionUtils.scale(4),
  },
});

export default style;
