import {View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {Layout, Typography} from 'common-ui';
import WebView from 'react-native-webview';
import {AuthenticationUtils} from 'common/authentication';
import {StringUtils} from 'common';
import {AppConfig} from 'config/AppConfig';
import style from './style';
import PDFPreview from '../TabHome/FileView/PdfViewer';

type Props = MainStackScreenProps<'File'>;
const FileScreen: React.FC<Props> = ({route}) => {
  const {fileType, fileUrl, unAuth} = route.params;
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const getToken = async () => {
      let authentication = await AuthenticationUtils.get();
      const data = authentication?.token;
      setToken(data);
    };

    getToken();
  }, []);

  const fileContent = !unAuth
    ? StringUtils.format(
        '{0}{1}',
        AppConfig.BasePegasusUrl,
        fileUrl.substring(1),
      )
    : fileUrl;

  const FileComponent = useMemo(() => {
    if (!token) {
      return <View />;
    }
    const webViewSource = {
      uri: fileContent,
      headers: !unAuth
        ? {
            Authorization: StringUtils.format('Bearer {0}', token),
          }
        : undefined,
    };

    if (fileType.startsWith('image/')) {
      return (
        <WebView
          style={style.webview}
          allowsProtectedMedia
          thirdPartyCookiesEnabled
          source={webViewSource}
          allowsFullscreenVideo
          bounces={true}
          useWebKit={true}
          scrollEnabled={true}
          startInLoadingState
        />
      );
    } else if (fileType === 'application/pdf') {
      return (
        // <View style={style.pdf}>
        <PDFPreview
          pdfUrl={fileContent}
          unAuth={unAuth}
          token={token}
          isFull
          fileScreen
        />
        // </View>
      );
    } else if (fileType.endsWith('presentationml.presentation')) {
      return (
        <View>
          <WebView
            style={style.webview}
            source={webViewSource}
            bounces={true}
            useWebKit={true}
            scrollEnabled={true}
            startInLoadingState
          />
        </View>
      );
    } else if (fileType.startsWith('video/') || fileType === 'false') {
      return (
        <WebView
          style={style.video}
          source={{uri: fileUrl}}
          bounces={true}
          useWebKit={true}
          scrollEnabled={true}
          startInLoadingState
          allowsFullscreenVideo
        />
      );
    }
    return <Typography text="Không hỡ trợ loại file" />;
  }, [fileContent, fileType, fileUrl, token, unAuth]);

  return (
    <Layout.Screen barStyle="light-content">
      <Layout.ScreenHeaderBack title="Nội dung chi tiết" />
      <Layout.Container>{FileComponent}</Layout.Container>
    </Layout.Screen>
  );
};
export default FileScreen;
