import {bg_error} from 'assets/images';
import CTTypograpy from 'components/CTTypography';
import {useAppSelector} from 'hook/CustomReduxHook';
import React, {ReactNode} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import EmptyState from './EmptyState';
import {ViewConnectionStyle} from './styles';

export interface ViewConnectionProps {
  children?: ReactNode;
}

const ViewConnection: React.FC<ViewConnectionProps> = (
  props: ViewConnectionProps,
) => {
  const {children} = props;
  const isConnected = useAppSelector(state => state.network.isConnected);
  const openConnectionPress = () => {
    if (!isConnected) {
      Linking.openSettings();
    }
  };
  return (
    <View style={ViewConnectionStyle.container}>
      {isConnected ? (
        children
      ) : (
        <EmptyState
          icon={bg_error}
          title="Sự cố kết nối"
          subTitle="Vui lòng kiểm tra lại kết nối của bạn để tiếp tục sử dụng ứng dụng"
          other={
            <TouchableOpacity
              onPress={openConnectionPress}
              style={ViewConnectionStyle.buttonConnect}>
              <CTTypograpy.Text
                style={ViewConnectionStyle.txtConnect}
                text="Kết nối"
              />
            </TouchableOpacity>
          }
        />
      )}
    </View>
  );
};

export default ViewConnection;
