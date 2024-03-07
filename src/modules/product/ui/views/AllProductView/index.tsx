import {colors} from 'assets/v2';
import {ErrorType, Layout, Typography} from 'common-ui';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {VariantEntity} from 'modules/product/models';
import {productService} from 'modules/product/services';
import ProductItemView from '../ProductItemView';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  onSeeAllPress: () => void;
}

const AllProductView: React.FC<Props> = ({onSeeAllPress}) => {
  const [variants, setVariants] = useState<Array<VariantEntity>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | ErrorType>(false);
  const [subError, setSubError] = useState<string>('');
  const {locationSelected, locations} = useAuth();
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

  const onVariantListPress = () => {
    onSeeAllPress();
  };

  useEffect(() => {
    productService.getAllVariant(
      locationSelected,
      locations,
      beforeCallApi,
      result => {
        setVariants(result);
      },
      onError,
      onFinally,
    );
  }, [beforeCallApi, locationSelected, locations, onError, onFinally]);
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.headerLeft}>
          <Typography
            type="h3"
            text="Tất cả sản phẩm"
            textType="medium"
            color={colors.secondary.o900}
          />
        </View>
        <TouchableOpacity onPress={onVariantListPress}>
          <View style={style.btnSeeMore}>
            <Typography
              type="h4"
              text="Xem tất cả"
              color={colors.secondary.o500}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.list}>
        <Layout.Loading loading={loading}>
          <Layout.Error subTitle={subError} error={error}>
            {variants.map(item => (
              <React.Fragment key={item.getId()}>
                <ProductItemView data={item} />
              </React.Fragment>
            ))}
          </Layout.Error>
        </Layout.Loading>
      </View>
    </View>
  );
};

export default AllProductView;
