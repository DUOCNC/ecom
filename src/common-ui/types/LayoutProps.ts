import {ReactNode} from 'react';
import {ColorValue, FlexAlignType, ViewStyle} from 'react-native';

export interface LayoutProps {
  children?: ReactNode;
  style?: ViewStyle;
  backgroundColor?: ColorValue;
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined;
  alignItems?: FlexAlignType | undefined;
  alignSelf?: 'auto' | FlexAlignType | undefined;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}
