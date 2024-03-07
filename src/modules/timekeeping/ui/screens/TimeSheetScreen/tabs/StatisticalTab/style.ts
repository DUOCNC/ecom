import {StyleSheet} from 'react-native';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(16),
  },
  timeWorkDetail: {
    borderRadius: DimentionUtils.scale(8),
    padding: DimentionUtils.scale(16),
    borderColor: colors.secondary.o200,
    borderWidth: 1,
    marginTop: DimentionUtils.scale(24),
  },
  title: {
    paddingTop: DimentionUtils.scale(2),
    marginBottom: DimentionUtils.scale(16),
  },
  box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(16),
  },
  boxSquare: {
    borderColor: colors.secondary.o200,
    borderRadius: DimentionUtils.scale(8),
    borderWidth: 1,
    width: DimentionUtils.scale(164),
    padding: DimentionUtils.scale(12),
    height: DimentionUtils.scale(124),
    alignItems: 'center',
  },
  boxIcon: {
    marginBottom: DimentionUtils.scale(12),
  },
  boxValue: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(8),
  },
  viewMonth: {
    height: DimentionUtils.scale(34),
  },
  tableSheet: {
    marginTop: DimentionUtils.scale(24),
    marginBottom: DimentionUtils.scale(26),
    minHeight: DimentionUtils.scale(400),
  },
  error: {
    marginBottom: DimentionUtils.scale(16),
  },
});

const styleTimeItem = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: DimentionUtils.scale(20),
    width: '100%',
    marginTop: DimentionUtils.scale(20),
  },
  value: {},
});

const timeSheetStyle = StyleSheet.create({
  container: {},
  header: {
    borderTopLeftRadius: DimentionUtils.scale(12),
    borderTopRightRadius: DimentionUtils.scale(12),
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderLeftColor: '#ccc',
    borderLeftWidth: 1,
  },
  weekend: {
    backgroundColor: '#f1f1f1',
  },
  text: {
    fontSize: 16,
  },
  body: {
    borderBottomLeftRadius: DimentionUtils.scale(12),
    borderBottomRightRadius: DimentionUtils.scale(12),
  },
});

export {style, styleTimeItem, timeSheetStyle};
