import {Typography} from 'common-ui';
import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import style from './style';
import {StringUtils} from 'common';
import {AppConfig} from 'config/AppConfig';
import {AuthenticationUtils} from 'common/authentication';
import {TouchableOpacity, View} from 'react-native';
import PDFPreview from './PdfViewer';

interface FileViewerProps {
  fileType: string;
  fileUrl: string;
  onPress: () => void;
  unAuth?: boolean;
  isFull?: boolean;
  isBotView?: boolean;
}

const FileViewer: React.FC<FileViewerProps> = ({
  fileType,
  fileUrl,
  onPress,
  unAuth,
  isFull,
  isBotView,
}) => {
  const [token, setToken] = useState<string>();
  const webViewRef = useRef(null);

  useEffect(() => {
    const getToken = async () => {
      let authentication = await AuthenticationUtils.get();
      const data = authentication?.token;
      setToken(data);
    };

    getToken();
  }, []);

  const url = !unAuth
    ? StringUtils.format(
        '{0}{1}',
        AppConfig.BasePegasusUrl,
        fileUrl.substring(1),
      )
    : fileUrl;

  const webViewSource = {
    uri: url,
    headers: !unAuth
      ? {
          Authorization: StringUtils.format('Bearer {0}', token),
        }
      : undefined,
  };

  if (!token) {
    return <View />;
  }

  if (fileType.startsWith('image/')) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[style.image, isFull && style.viewFull]}>
        <WebView
          ref={webViewRef}
          allowsProtectedMedia
          style={[style.image, isFull && style.viewFull]}
          thirdPartyCookiesEnabled
          source={webViewSource}
          allowsFullscreenVideo
          bounces={true}
          useWebKit={true}
          scrollEnabled={true}
          downloadingMessage="Tải xuống"
          onFileDownload={() => {}}
          startInLoadingState
        />
      </TouchableOpacity>
    );
  } else if (fileType.endsWith('presentationml.presentation')) {
    return (
      <TouchableOpacity onPress={onPress} style={style.pdf}>
        <WebView
          style={style.pdf}
          source={webViewSource}
          bounces={true}
          useWebKit={true}
          scrollEnabled={true}
          startInLoadingState
        />
      </TouchableOpacity>
    );
  } else if (fileType === 'application/pdf') {
    return (
      <TouchableOpacity style={[!isFull && style.pdf]} onPress={onPress}>
        <PDFPreview
          pdfUrl={url}
          unAuth={unAuth}
          token={token}
          isFull={isFull}
          isBotView={isBotView}
        />
      </TouchableOpacity>
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
  } else {
    return (
      <Typography
        text={StringUtils.format('Không hỡ trợ loại file: {0}', fileType)}
      />
    );
  }
};

export default FileViewer;
