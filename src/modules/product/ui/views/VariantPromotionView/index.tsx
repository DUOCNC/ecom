import React, {createRef, useEffect, useState} from 'react';
import {ErrorView, Layout, Typography} from 'common-ui';
import {Image, TouchableOpacity, View, Animated} from 'react-native';
import style from './style';
import {ic_not_found_promotion, ic_right} from 'assets/images';
import {promotionService} from 'modules/product/services';
import {PromotionEntity, VariantEntity} from 'modules/product/models';
import PromotionItemView from '../PromotionItemView';
import ModalPromotionView, {ModalPromotionRef} from '../ModalPromotionView';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  variant: VariantEntity;
  onContentChange: (y: number, offsetY: number) => void;
}

const {FlatList} = Animated;

const VariantPromotionView: React.FC<Props> = ({variant, onContentChange}) => {
  const modalRef = createRef<ModalPromotionRef>();
  const [promotions, setPromotions] = useState<Array<PromotionEntity>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {locationSelected} = useAuth();
  const onPress = () => {
    modalRef.current?.open();
  };
  useEffect(() => {
    setLoading(true);
    promotionService.getPromotions(
      variant,
      result => {
        setPromotions(result);
        setLoading(false);
      },
      locationSelected.locationId || undefined,
    );
  }, [variant]);
  return (
    <View
      onLayout={e => {
        onContentChange(e.nativeEvent.layout.y, e.nativeEvent.layout.height);
      }}
      style={style.container}>
      <TouchableOpacity
        disabled={promotions.length === 0}
        onPress={onPress}
        style={style.header}>
        <Typography
          textType="medium"
          type="h3"
          style={style.title}
          text="Chương trình khuyến mại"
        />
        {promotions.length > 0 && (
          <View style={style.btnRight}>
            <Image source={ic_right} />
          </View>
        )}
      </TouchableOpacity>
      <View style={style.content}>
        <Layout.Loading loading={loading}>
          {promotions.length === 0 ? (
            <View>
              <ErrorView
                imageSize="small"
                image={ic_not_found_promotion}
                subTitle="Không có chương trình khuyến mại"
              />
            </View>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              keyExtractor={item => item.getKey()}
              data={promotions}
              renderItem={({item}) => (
                <PromotionItemView
                  vertical={false}
                  variant={variant}
                  promotion={item}
                />
              )}
            />
          )}
        </Layout.Loading>
      </View>
      <ModalPromotionView
        variant={variant}
        promotions={promotions}
        ref={modalRef}
      />
    </View>
  );
};

export default VariantPromotionView;
