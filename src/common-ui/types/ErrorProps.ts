import {ImageSourcePropType} from 'react-native';
import {ErrorViewProps} from './ErrorViewProps';
import {AlignVerticalErrorEnum} from 'enums/MainErrorType';

export type ErrorType =
  | ErrorViewProps
  | 'SearchNotfound'
  | 'Notfound'
  | 'Timeout'
  | 'LostInternet'
  | 'Error'
  | 'VersionError'
  | 'NotfoundReport'
  | 'NotPermission'
  | 'NotPermissionReport';

export interface ErrorProps {
  error: ErrorType | false;
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  bottom?: React.ReactNode;
  image?: ImageSourcePropType;
  align?: AlignVerticalErrorEnum;
  errCode?: number | null;
  onReload?: () => void;
}
