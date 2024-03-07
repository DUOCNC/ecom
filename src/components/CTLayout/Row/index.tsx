import React, {ReactNode} from 'react';
import {
  ColorValue,
  FlexAlignType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import rowStyle from './style';

interface RowProps {
  children?: ReactNode;
  flexDirection?: 'row' | 'row-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  backgroundColor?: ColorValue;
  borderWidth?: number;
  borderRadius?: number;
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType | undefined;
  style?: StyleProp<ViewStyle>;
}

const Row: React.FC<RowProps> = ({
  flexDirection,
  children,
  justifyContent,
  backgroundColor,
  borderWidth,
  borderRadius,
  alignContent,
  alignItems,
  alignSelf,
  style,
}) => {
  return (
    <View
      style={[
        rowStyle.container,
        {
          flexDirection: flexDirection,
          justifyContent: justifyContent,
          backgroundColor: backgroundColor,
          borderWidth: borderWidth ? normalize(borderWidth) : undefined,
          borderRadius: borderRadius ? normalize(borderRadius) : undefined,
          alignItems: alignItems,
          alignContent: alignContent,
          alignSelf: alignSelf,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Row;
