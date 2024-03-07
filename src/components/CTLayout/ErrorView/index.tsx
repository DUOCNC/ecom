import {bg_error} from 'assets/images';
import {CTButton} from 'components/Button';
import EmptyState from 'components/CTScreen/EmptyState';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import style from './style';

interface ErrorViewProps {
  children?: ReactNode;
  error?: string | false;
  onReloadPress?: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = (props: ErrorViewProps) => {
  return (
    <View style={[style.container]}>
      {typeof props.error === 'string' ? (
        <View style={style.emptyView}>
          <EmptyState
            title="Không thể truy cập hệ thống"
            icon={bg_error}
            subTitle={props.error}
            other={
              <CTButton
                onPress={props.onReloadPress}
                style={style.btnError}
                buttonType="default"
                text="Tải lại"
              />
            }
          />
        </View>
      ) : (
        props.children
      )}
    </View>
  );
};

export default ErrorView;
