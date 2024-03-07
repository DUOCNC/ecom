import React from 'react';
import {Layout} from 'common-ui';
import WebView from 'react-native-webview';
import {useConfig} from 'hook';
import {MainStackScreenProps} from '..';
import {View} from 'react-native';

type Props = MainStackScreenProps<'UserSupport'>;
const UserSupportScreen: React.FC<Props> = () => {
  const config = useConfig();
  if (!config.userSupportLink) {
    return <View />;
  }
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Hỗ trợ người dùng" />
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        <WebView
          source={{
            uri: config.userSupportLink,
          }}
        />
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default UserSupportScreen;
