import {Edge} from 'react-native-safe-area-context';
import {LayoutProps} from './LayoutProps';

export interface ContainerProps extends LayoutProps {
  edges?: ReadonlyArray<Edge>;
}
