import axios from 'axios';
import {DimentionUtils as DimensionUtils, Typography} from 'common-ui';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {Buffer} from 'buffer';
interface PDFPreviewProps {
  pdfUrl: string;
  token: string;
  isFull?: boolean;
  unAuth?: boolean;
  isBotView?: boolean;
  fileScreen?: boolean;
}
const WIDTH = Dimensions.get('screen').width;
const HEIGHT_DEFAULT = 520;
const PDFPreview: React.FC<PDFPreviewProps> = ({
  pdfUrl,
  token,
  isFull,
  unAuth,
  isBotView,
  fileScreen,
}) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [heightPDF, setHeightPDF] = useState<number>(HEIGHT_DEFAULT);
  const pdfRef = useRef(null);
  const handleLoadComplete = async (numberOfPages: number, size: any) => {
    setIsLoading(false);
    const height = (size.height / size.width) * WIDTH * numberOfPages + 50;
    setHeightPDF(height);
  };
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const headers = !unAuth
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined;
        const response = await axios.get(pdfUrl, {
          headers: headers,
          responseType: 'arraybuffer',
        });
        const pdfData = response.data;
        const buffer = Buffer.from(pdfData);
        const base64String = buffer.toString('base64');

        const pdfUri = `data:application/pdf;base64,${base64String}`;

        setUrl(pdfUri);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [pdfUrl, token, unAuth]);

  const showMore = useMemo(() => {
    if (Platform.OS === 'ios' || isBotView || fileScreen) {
      return false;
    }
    if (heightPDF > HEIGHT_DEFAULT) {
      return true;
    }
    return false;
  }, [heightPDF, isBotView, fileScreen]);

  return (
    <View style={[styles.container]}>
      {url ? (
        <>
          {isLoading && (
            <ActivityIndicator size="large" style={styles.container} />
          )}
          <Pdf
            ref={pdfRef}
            source={{uri: url}}
            onLoadComplete={(numberOfPages, path, size) => {
              handleLoadComplete(numberOfPages, size);
            }}
            style={[
              styles.pdf,
              !isBotView && Platform.OS === 'ios' && {height: heightPDF},
              isFull && styles.pdfFull,
            ]}
          />
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" style={styles.container} />
        </View>
      )}
      {showMore && (
        <Typography style={styles.showMore} text="Xem thêm" type="h3" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  showMore: {
    paddingTop: DimensionUtils.scale(8),
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  pdf: {
    width: DimensionUtils.scale(300),
    height: DimensionUtils.scale(350),
  },
  viewFull: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height,
  },
  pdfFull: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PDFPreview;
