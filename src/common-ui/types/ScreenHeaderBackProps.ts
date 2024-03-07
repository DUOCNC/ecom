import {ErrorType} from './ErrorProps';

export interface ScreenHeaderBackProps {
  title?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  onBackPress?: () => void;
  error?: ErrorType | false;
}
