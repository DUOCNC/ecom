import {bg_error} from 'assets/images';
import {
  CTToolbar,
  CTToolbarBack,
  CTToolbarBackProps,
} from 'components/CTToolbar';
import React, {ReactNode, useMemo} from 'react';
import {ActivityIndicator, KeyboardAvoidingView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmptyState from './EmptyState';
import {CTScreenStyle} from './styles';
import ViewConnection from './ViewConnection';

interface CTScreenProps {
  firstLoading?: boolean;
  children?: ReactNode;
  firstError?: false | string;
  dismissToolbar?: boolean;
  renderToolbar?: React.ReactElement;
  showToolbarBack?: boolean;
  toolbarBackProperty?: CTToolbarBackProps;
  disableSafeAreaTop?: boolean;
  disableSafeAreaBottom?: boolean;
}

const CTScreen: React.FC<CTScreenProps> = (props: CTScreenProps) => {
  const {
    toolbarBackProperty,
    firstError,
    children,
    firstLoading,
    dismissToolbar,
    showToolbarBack,
    renderToolbar,
    disableSafeAreaTop,
    disableSafeAreaBottom,
  } = props;
  const insets = useSafeAreaInsets();
  const heightTopIfEnableSafeArea = useMemo(
    () => (disableSafeAreaTop ? 0 : insets.top),
    [disableSafeAreaTop, insets.top],
  );
  const heightBottomIfEnableSafeArea = useMemo(
    () => (disableSafeAreaBottom ? 0 : insets.bottom),
    [disableSafeAreaBottom, insets.bottom],
  );
  const view = useMemo(() => {
    if (!firstError) {
      return children;
    }
    return <EmptyState icon={bg_error} title="Ops Lỗi" subTitle={firstError} />;
  }, [children, firstError]);
  const toolbar = useMemo(() => {
    if (dismissToolbar) {
      return <View style={{height: heightTopIfEnableSafeArea}} />;
    }
    if (showToolbarBack) {
      return <CTToolbarBack {...toolbarBackProperty} />;
    }
    return <CTToolbar>{renderToolbar}</CTToolbar>;
  }, [
    dismissToolbar,
    heightTopIfEnableSafeArea,
    renderToolbar,
    showToolbarBack,
    toolbarBackProperty,
  ]);
  const bottom = useMemo(() => {
    return <View style={{height: heightBottomIfEnableSafeArea}} />;
  }, [heightBottomIfEnableSafeArea]);
  return (
    <KeyboardAvoidingView style={CTScreenStyle.keyboard}>
      <View style={CTScreenStyle.container}>
        {toolbar}
        <ViewConnection>
          <View style={CTScreenStyle.bodyContainer}>
            {firstLoading ? (
              <View style={CTScreenStyle.rowLoading}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              view
            )}
          </View>
        </ViewConnection>
        {bottom}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CTScreen;
