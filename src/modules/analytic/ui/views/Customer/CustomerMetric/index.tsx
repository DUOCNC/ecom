import {Colors} from 'assets/colors';
import {ic_right} from 'assets/images';
import {Font} from 'components/Base/Text/enums';
import CTTypography from 'components/CTTypography';
import React, {ReactNode} from 'react';
import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import {Styles} from './style';

interface CustomerMetricProps {
  icon: ImageSourcePropType;
  textHeader: string;
  value: string;
  unit: string;
  type: string;
  onPress: (metricType: string) => void;
  children?: ReactNode;
}

const CustomerMetric: React.FC<CustomerMetricProps> = ({
  icon,
  textHeader,
  value,
  unit,
  type,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(type);
      }}
      style={Styles.customerMetrics}>
      <View style={Styles.customerHeader}>
        <Image
          source={icon}
          style={Styles.icon}
          width={normalize(32)}
          height={normalize(32)}
        />
        <CTTypography.Text
          text={textHeader}
          level="3"
          font={Font.Medium}
          style={Styles.headerText}
        />
        <View style={Styles.iconMore}>
          <Image
            source={ic_right}
            style={[{tintColor: Colors.Gray400}]}
            width={normalize(6)}
            height={normalize(10)}
          />
        </View>
      </View>
      <View style={Styles.customerBody}>
        <CTTypography.Header
          text={value}
          fontSize={normalize(30)}
          style={Styles.textBody}
          font={Font.Medium}
        />
        <CTTypography.Text
          text={unit}
          level="3"
          style={Styles.textUniBody}
          font={Font.Medium}
        />
      </View>
      {children && <View style={Styles.customerFooter}>{children}</View>}
    </TouchableOpacity>
  );
};

export default CustomerMetric;
