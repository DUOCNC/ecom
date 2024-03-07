import {ImageSourcePropType} from 'react-native';

export interface ErrorViewProps {
  title?: string;
  image?: ImageSourcePropType;
  subTitle?: string;
  bottom?: React.ReactNode;
  imageSize?: 'default' | 'small';
}
