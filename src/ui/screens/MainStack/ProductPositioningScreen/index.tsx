import {Layout} from 'common-ui';
import {MainRouteConfig} from 'config/RouteConfig';
import {
  AllProductPositioning,
  SearchProductPositioningView,
} from 'modules/product/ui';
import React from 'react';
import {View} from 'react-native';
import {MainStackScreenProps} from '..';
import style from './style';

type Props = MainStackScreenProps<'ProductPositioning'>;

const ProductPositioningScreen: React.FC<Props> = ({navigation, route}) => {
  const onSearchPress = () => {
    navigation.navigate(MainRouteConfig.ProductPositioningSearch, {});
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Chuyển vị trí sản phẩm">
        <View style={style.headerSearch}>
          <SearchProductPositioningView
            keyword=""
            onSearchPress={onSearchPress}
            barcodeScreen={MainRouteConfig.ProductPositioningBarCode}
          />
        </View>
      </Layout.ScreenHeaderBack>
      <Layout.SafeAreaContainer edges={['bottom']}>
        <AllProductPositioning route={route} />
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default ProductPositioningScreen;
