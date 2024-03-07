import React from 'react';
import {Layout} from 'common-ui';
import WebView from 'react-native-webview';
import {useConfig} from 'hook';

const RenewScreen: React.FC = () => {
  const config = useConfig();
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thu cũ đổi mới" />
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        <WebView
          source={{
            uri: `${config.renewUrl}`,
          }}
        />
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default RenewScreen;
