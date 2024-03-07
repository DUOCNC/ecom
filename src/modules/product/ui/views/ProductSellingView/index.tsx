import React, {useCallback, useEffect, useState} from 'react';
import {Image, View, Animated} from 'react-native';
import style from './style';
import {ic_hot} from 'assets/images';
import {ErrorType, Layout, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {productService} from 'modules/product/services';
import {TopVariantEntity} from 'modules/product/models';
import ProductSellingItemView from '../ProductSellingItemView';
import {useAuth} from 'providers/contexts/AuthContext';

const {FlatList} = Animated;

const ProductSellingView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | ErrorType>(false);
  const [subError, setSubError] = useState<string>('');
  const [topVariants, setTopVariants] = useState<Array<TopVariantEntity>>([]);
  const {locationSelected, locations} = useAuth();
  const onSuccess = (result: Array<TopVariantEntity>) => {
    setTopVariants(result);
  };
  const beforeCallApi = useCallback(() => {
    setLoading(true);
  }, []);
  const onFinally = useCallback(() => {
    setLoading(false);
  }, []);
  const onError = useCallback((er: ErrorType, msgError: string) => {
    setError(er);
    setSubError(msgError);
  }, []);
  useEffect(() => {
    productService.getTopVariants(
      locationSelected,
      locations,
      onSuccess,
      beforeCallApi,
      onError,
      onFinally,
    );
  }, [beforeCallApi, onFinally, onError, locationSelected, locations]);
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image style={style.headerIcon} source={ic_hot} />
        <Typography
          style={style.headerTitle}
          type="h3"
          text="Sản phẩm bán chạy"
          textType="medium"
          color={colors.secondary.o900}
        />
      </View>
      <View style={style.list}>
        <Layout.Loading loading={loading}>
          <Layout.Error subTitle={subError} error={error}>
            <FlatList
              horizontal
              scrollEventThrottle={16}
              bounces
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              data={topVariants}
              keyExtractor={topVariant => topVariant.getSku()}
              renderItem={({item}) => <ProductSellingItemView data={item} />}
            />
          </Layout.Error>
        </Layout.Loading>
      </View>
    </View>
  );
};

export default ProductSellingView;
