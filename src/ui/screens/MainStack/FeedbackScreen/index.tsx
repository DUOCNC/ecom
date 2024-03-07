import React from 'react';
import {Layout} from 'common-ui';
import WebView from 'react-native-webview';
import {useConfig} from 'hook';
import {useAuth} from 'providers/contexts/AuthContext';

const FeedbackScreen: React.FC = () => {
  const config = useConfig();
  const {profile} = useAuth();
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Đề xuất góp ý" />
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        <WebView
          source={{
            uri: `${config.feedbackUrl}?code=${profile?.code}`,
          }}
        />
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default FeedbackScreen;
