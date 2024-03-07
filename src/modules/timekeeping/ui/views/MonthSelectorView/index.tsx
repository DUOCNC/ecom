import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {Typography} from 'common-ui';
import {Animated, FlatList as RNFlatList, TouchableOpacity} from 'react-native';
import {Moment} from 'moment';
import moment from 'moment';
import style from './style';

export type MonthSelectorRef = {};

interface MonthSelectorProps {
  viewDate: Moment;
  onChangeMonth: (viewDate: Moment) => void;
}
const {FlatList} = Animated;
export type MonthSelectorComponent = ForwardRefRenderFunction<
  MonthSelectorRef,
  MonthSelectorProps
>;
// Tính toán ngày tháng cho 6 tháng gần nhất
const months: Array<Moment> = [];
for (let i = 0; i < 6; i++) {
  const month = moment().subtract(i, 'months');
  months.unshift(month);
}

const MonthSelectorView: MonthSelectorComponent = (
  {viewDate, onChangeMonth},
  MonthSelectorRef,
) => {
  // Tính toán các thông tin liên quan đến chấm công
  useImperativeHandle(MonthSelectorRef, () => ({}));
  const flatListRef = useRef<RNFlatList>(null);

  const handleMonthChange = (date: Moment) => {
    onChangeMonth(moment(date));
  };

  useEffect(() => {
    const index = months.findIndex(
      e => e.get('M') === viewDate.get('M') && e.get('y') === viewDate.get('y'),
    );
    if (index === -1) {
      return;
    }

    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewOffset: 100,
    });
  }, [viewDate]);

  const getItemLayout = (index: number) => ({
    length: 40, // Chiều cao của mỗi item trong list
    offset: 100 * index, // Vị trí của item trong list
    index,
  });

  return (
    <Animated.View>
      <FlatList
        getItemLayout={(data, index) => getItemLayout(index)} // Thêm getItemLayout vào FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={months}
        keyExtractor={item => item.toString()}
        renderItem={data => {
          const isSelected = viewDate && viewDate.isSame(data.item, 'month');
          return (
            <TouchableOpacity
              style={[style.monthItem, isSelected && style.monthSelected]}
              key={data.item.format('MM-YYYY')}
              onPress={() => handleMonthChange(data.item)}>
              <Typography text={data.item.format('MM/YYYY')} />
            </TouchableOpacity>
          );
        }}
      />
    </Animated.View>
  );
};

export default forwardRef(MonthSelectorView);
