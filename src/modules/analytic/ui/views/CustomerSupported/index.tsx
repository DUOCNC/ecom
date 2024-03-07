import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import {CustomerSupportedStyled} from './style';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import CTDatePicker from 'components/CTDatePicker';
import {ic_attention} from 'assets/images';

interface Props {
  icon: ImageSourcePropType;
  value: string;
  title: string;
  onChangeDate: (date: Date) => void;
  date: Date;
  description?: React.ReactNode;
}

const CustomerSupported: React.FC<Props> = (props: Props) => {
  const {icon, title, value, onChangeDate, date, description} = props;
  return (
    <View style={CustomerSupportedStyled.container}>
      <View style={CustomerSupportedStyled.header}>
        <CTTypography.Text
          font={Font.Medium}
          level="2"
          text={title.toUpperCase()}
        />
        <CTDatePicker
          onValueChange={onChangeDate}
          type="date"
          value={date}
          headerText="Chọn ngày"
        />
      </View>
      <View style={CustomerSupportedStyled.row}>
        {value === 'warning' ? (
          <View style={CustomerSupportedStyled.viewIconWarning}>
            <Image
              source={ic_attention}
              style={CustomerSupportedStyled.iconWarning}
            />
          </View>
        ) : (
          <CTTypography.Header font={Font.Medium} level="4" text={value} />
        )}
        <Image style={CustomerSupportedStyled.iconUser} source={icon} />
      </View>
      {Boolean(description) && (
        <View style={CustomerSupportedStyled.row}>{description}</View>
      )}
    </View>
  );
};

export default CustomerSupported;
