import React, {ReactNode} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RBSheetStyle} from './stlye';

interface Props extends RBSheetProps {
  children?: ReactNode;
  disableSafeArea?: boolean;
}

const CTRbSheet = React.forwardRef<RBSheet, Props>((props, ref) => {
  const {children, height, disableSafeArea, ...rest} = props;
  const bottom = useSafeAreaInsets().bottom;
  return (
    <RBSheet
      closeOnPressBack
      height={height && (disableSafeArea ? height : bottom + height)}
      ref={ref}
      dragFromTopOnly={true}
      keyboardAvoidingViewEnabled={true}
      customStyles={{
        container: RBSheetStyle.container,
        draggableIcon: RBSheetStyle.draggableIcon,
      }}
      {...rest}>
      {children}
    </RBSheet>
  );
});
export default CTRbSheet;
