import React from 'react';
import {Layout} from 'common-ui';
import WebView from 'react-native-webview';
import {useConfig} from 'hook';
import {MainStackScreenProps} from '..';
import {View} from 'react-native';

type Props = MainStackScreenProps<'NewProduct'>;
const NewProductScreen: React.FC<Props> = () => {
  const config = useConfig();
  if (!config.newProductLink) {
    return <View />;
  }
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Sản phẩm mới" />
      <Layout.SafeAreaContainer edges={['left', 'right', 'bottom']}>
        <WebView
          source={{
            uri: config.newProductLink,
          }}
        />
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default NewProductScreen;
