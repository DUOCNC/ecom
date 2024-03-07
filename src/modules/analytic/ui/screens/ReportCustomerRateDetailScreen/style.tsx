import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {Size} from 'assets/theme';
import {DimentionUtils} from 'common-ui';

const Styles = StyleSheet.create({
  container: {
    flex: DimentionUtils.scale(1),
    backgroundColor: Colors.White,
  },
  header: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(8),
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: DimentionUtils.scale(16),
    // paddingVertical: DimentionUtils.scale(8),
  },
  textTag: {
    borderStyle: 'solid',
    borderColor: '#5858B6',
    borderWidth: DimentionUtils.scale(1),
    paddingVertical: DimentionUtils.scale(2),
    paddingHorizontal: DimentionUtils.scale(12),
    color: '#5858B6',
    borderRadius: DimentionUtils.scale(15),
    backgroundColor: '#F0F0FE',
    overflow: 'hidden',
  },
  rowItem: {
    paddingVertical: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    height: Size.DefaultToolbarHeight + DimentionUtils.scale(50),
  },
  viewInfo: {
    marginHorizontal: DimentionUtils.scale(8),
    flex: 1,
  },
  accountCode: {
    marginTop: DimentionUtils.scale(4),
    flexDirection: 'column',
  },
  avatarContainer: {
    marginTop: DimentionUtils.scale(6),
    alignSelf: 'flex-start',
  },
  avatar: {
    width: DimentionUtils.scale(40),
    height: DimentionUtils.scale(40),
  },
  iconUser: {
    width: DimentionUtils.scale(35),
    height: DimentionUtils.scale(35),
    alignSelf: 'center',
  },
  btnEdit: {
    marginTop: DimentionUtils.scale(6),
    alignSelf: 'flex-start',
  },
  description: {
    marginBottom: DimentionUtils.scale(16),
  },
  descriptionText: {color: Colors.Gray500},
  descriptionPeriod: {
    color: Colors.Blue,
  },
  descriptionItalicText: {
    fontStyle: 'italic',
    color: Colors.Gray500,
    fontWeight: '500',
  },
  displayNone: {
    display: 'none',
  },
});
const ReportTabStyle = StyleSheet.create({
  container: {
    height: DimentionUtils.scale(44),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
});

export {Styles, ReportTabStyle};
