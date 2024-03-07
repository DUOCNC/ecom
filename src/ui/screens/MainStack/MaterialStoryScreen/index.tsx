import React from 'react';
import {Layout} from 'common-ui';
import WebView from 'react-native-webview';
import {useAppDispatch, useConfig} from 'hook';
import {showLoading} from 'reduxs/Modals/ModalReducer';

const MaterialStoryScreen: React.FC = () => {
  const config = useConfig();
  const dispatch = useAppDispatch();
  dispatch(showLoading);
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Câu chuyện sản phẩm" />
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        {config.landingPageUrl && (
          <WebView
            source={{
              uri: config.landingPageUrl,
            }}
          />
        )}
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default MaterialStoryScreen;
