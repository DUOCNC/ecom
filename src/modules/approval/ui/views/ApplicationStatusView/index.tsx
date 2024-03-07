import {DimentionUtils, Typography} from 'common-ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface IProps {
  type: 'Đã duyệt' | 'Không duyệt' | 'Chờ duyệt' | 'Tìm người duyệt';
  value: string;
}
const ApplicationStatusView: React.FC<IProps> = ({type, value}) => {
  const getStyle = () => {
    switch (type) {
      case 'Đã duyệt':
        return {
          color: '#12B76A',
          backgroundColor: '#ECFDF3',
          borderColor: '#A6F4C5',
        };
      case 'Không duyệt':
        return {
          color: '#F04438',
          backgroundColor: '#FEF3F2',
          borderColor: '#f04438',
        };

      case 'Chờ duyệt':
        return {
          color: '#F79009',
          backgroundColor: '#FFFAEB',
          borderColor: '#f9a433',
        };

      case 'Tìm người duyệt':
        return {
          color: '#7A5AF8',
          backgroundColor: '#F4F3FF',
          borderColor: '#BDB4FE',
        };

      default: {
        return {
          color: '#12B76A',
          backgroundColor: '#ECFDF3',
          borderColor: '#12B76A',
        };
      }
    }
  };
  return (
    <View style={style.container}>
      <View
        style={[
          style.viewSubStatus,
          {
            backgroundColor: getStyle().backgroundColor,
            borderColor: getStyle().borderColor,
          },
        ]}>
        <Typography
          style={[style.txtStatus]}
          color={getStyle().color}
          text={value}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(8)},
  text: {},
  viewSubStatus: {
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(2),
    borderRadius: DimentionUtils.scale(30),
    borderWidth: DimentionUtils.scale(1),
  },
  txtStatus: {
    lineHeight: DimentionUtils.scale(20),
  },
});
export default ApplicationStatusView;
