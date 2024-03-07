import {Layout, StatusBar} from 'common-ui';
import {useAppSelector} from 'hook/CustomReduxHook';
import React, {useEffect} from 'react';
import {Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  AllProductView,
  // CategoryView,
  ProductSellingView,
  SearchProductView,
} from '../../views';
import style from './style';
import {productService} from 'modules/product/services';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {useIsFocused} from '@react-navigation/native';
import {colors} from 'assets/v2';
import {useAuth} from 'providers/contexts/AuthContext';

const {View, ScrollView} = Animated;

type Props = MainStackScreenProps<'Main'>;

const TabProduct: React.FC<Props> = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const isFocus = useIsFocused();
  const categoryReducer = useAppSelector(state => state.category);
  const {locationSelected} = useAuth();

  const onSearchPress = () => {
    navigation.navigate(MainRouteConfig.VariantSearch, {});
  };

  const onSeeAllPress = () => {
    navigation.navigate(MainRouteConfig.VariantList, {keyword: ''});
  };

  useEffect(() => {
    if (!categoryReducer.isLoad) {
      productService.getCategory();
    }
  }, [categoryReducer.isLoad]);
  return (
    <Layout.Container backgroundColor={colors.base.white}>
      {isFocus && <StatusBar barStyle="dark-content" />}
      <Layout.Container>
        <View
          style={[
            {
              paddingTop: top,
            },
            style.header,
          ]}>
          <View style={style.headerSearch}>
            <SearchProductView keyword="" onSearchPress={onSearchPress} />
          </View>
        </View>
        <ScrollView
          nestedScrollEnabled={true}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={[style.scrollView]}>
          {/* <CategoryView /> */}
          {!locationSelected.supported && <ProductSellingView />}
          <AllProductView onSeeAllPress={onSeeAllPress} />
        </ScrollView>
      </Layout.Container>
    </Layout.Container>
  );
};

export default TabProduct;
