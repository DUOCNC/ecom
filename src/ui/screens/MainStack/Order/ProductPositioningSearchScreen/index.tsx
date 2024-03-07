import {ErrorType, Layout} from 'common-ui';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ProductSearchInputView} from 'modules/product/ui';
import style from './style';
import {MainRouteConfig} from 'config/RouteConfig';
import {inventoryService} from 'modules/product/services';
import {useAuth} from 'providers/contexts/AuthContext';
import {MainStackScreenProps} from '../..';
import ProductSuggestionView from './ProductSuggestionView';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';
import _ from 'lodash';

type Props = MainStackScreenProps<'ProductPositioningSearch'>;

const ProductPositioningSearchScreen: React.FC<Props> = ({navigation}) => {
  const [errorType, setErrorType] = useState<false | ErrorType>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [isLoad, setLoad] = useState<boolean>(false);
  const [suggestions, setSuggestion] = useState<Array<BinLocationEntity>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {locationSelected} = useAuth();
  const locationId = locationSelected.locationId;

  const navigateSearch = (txt: string, item: BinLocationEntity) => {
    navigation.navigate(MainRouteConfig.ProductPositioning, {
      keyword: txt,
      items: [item],
    });
  };
  const onSearchPress = (txt: string) => {
    onSearch(txt);
  };
  const onSearch = (txt: string) => {
    setKeyword(txt);
  };

  const onItemPress = (txt: string, item: BinLocationEntity) => {
    navigateSearch(txt, item);
  };

  /**
   * Khi component khởi tạo lấy danh sách lịch sử tìm kiếm
   */
  useEffect(() => {
    if (!isLoad) {
      setLoading(true);
      inventoryService.getVariantsByBinLocation(
        keyword,
        locationId,
        rsSuggestion => {
          setLoading(false);
          setSuggestion(rsSuggestion);
          setLoad(true);
        },
      );
    }
  }, [isLoad, keyword, locationId]);

  /**
   * lấy danh sách suggestions
   */
  useEffect(() => {
    setLoading(true);
    getBinData();
  }, [keyword]);

  const getBinData = _.debounce(() => {
    inventoryService.getVariantsByBinLocation(
      keyword,
      locationId,
      rsSuggestion => {
        setLoading(false);
        setSuggestion(rsSuggestion);
        if (rsSuggestion.length <= 0) {
          setErrorType('SearchNotfound');
        } else {
          setErrorType(false);
        }
      },
    );
  }, 300);

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Chuyển vị trí sản phẩm">
        <View style={style.formSearch}>
          <ProductSearchInputView
            onSearchPress={onSearchPress}
            onSearch={onSearch}
            barcodeScreen={MainRouteConfig.ProductPositioningBarCode}
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.Container>
        <Layout.Loading loading={loading}>
          <Layout.Error error={errorType}>
            <ProductSuggestionView
              onPressItem={onItemPress}
              keyword={keyword}
              suggestions={suggestions}
            />
          </Layout.Error>
        </Layout.Loading>
      </Layout.Container>
    </Layout.Screen>
  );
};

export default ProductPositioningSearchScreen;
