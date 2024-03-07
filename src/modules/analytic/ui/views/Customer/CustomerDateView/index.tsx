import CTTypography from 'components/CTTypography';
import {View} from 'react-native';
import React from 'react';
import {Styles} from './style';
import CTDatePicker from 'components/CTDatePicker';
import {Font} from 'components/Base/Text/enums';

interface CustomerDateViewProps {
  title: string;
  date: Date;
  onChange: (date: Date) => void;
}
const CustomerDateView: React.FC<CustomerDateViewProps> = ({
  title,
  date,
  onChange,
}) => {
  return (
    <View style={Styles.container}>
      <CTTypography.Text text={title} level="2" font={Font.Medium} />
      <CTDatePicker
        type="date"
        value={date}
        onValueChange={value => {
          onChange(value);
        }}
        headerText="Chọn ngày"
      />
    </View>
  );
};

export default CustomerDateView;
