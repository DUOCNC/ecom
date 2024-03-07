import {ic_not_found_promotion} from 'assets/images';
import {CTButton} from 'components/Button';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {ErrorType, Layout, SearchInput, Typography} from 'common-ui';
import Style from './style';
import EmptyState from 'components/CTScreen/EmptyState';
import {orderService} from 'modules/order/services';
import {Font} from 'components/Base/Text';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors} from 'assets/v2';
import GiftProgramItemView from 'modules/order/ui/views/GiftProgramItemView';
import {SuggestedDiscountGiftEntity} from 'modules/order/models/entities/GiftProgramEntity';
import {
  EntitledMethod,
  LineItemTypeLowercase,
} from 'modules/order/enums/Promotion';
import {StringUtils} from 'common';

type Props = MainStackScreenProps<'PickGift'>;

const PickGiftScreen: React.FC<Props> = ({navigation, route}) => {
  const {order, lineItem, isNew, lineIndex} = route.params;
  const bottom = useSafeAreaInsets().bottom;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType | false>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [giftProgramSelected, setGiftSelectedProgram] =
    useState<SuggestedDiscountGiftEntity | null>(null);
  const [suggestedDiscounts, setSuggestedDiscounts] = useState<
    Array<SuggestedDiscountGiftEntity>
  >([]);

  useEffect(() => {
    if (lineItem.getGiftProgram()) {
      setGiftSelectedProgram(lineItem.getGiftProgram());
    }
    orderService.getGiftProgramWithLineIndex(
      order,
      lineItem,
      lineIndex,
      result => {
        if (result.getSuggestDiscountsFromLineItems(lineItem.getVariantId())) {
          setSuggestedDiscounts(
            result.getSuggestDiscountsFromLineItems(lineItem.getVariantId()),
          );
        }
      },
      result => {
        console.log('Lỗi', result);
      },
      () => setLoading(true),
      () => setLoading(false),
    );
  }, [lineIndex, lineItem, order]);

  const onCheckedChange = (
    checked: boolean,
    item: SuggestedDiscountGiftEntity,
  ) => {
    Keyboard.dismiss();
    if (checked) {
      setGiftSelectedProgram(item);
      return;
    }
    setGiftSelectedProgram(null);
  };

  const onFinish = () => {
    if (giftProgramSelected) {
      lineItem.setGiftProgram(giftProgramSelected);
      lineItem.setType(LineItemTypeLowercase.GIFT);
    }
    navigation.navigate(MainRouteConfig.PosCreate, {
      lineItem: {item: lineItem, index: lineIndex, isNew: isNew},
    });
  };

  const listGiftProduct = useMemo(() => {
    return suggestedDiscounts
      .filter(item => {
        return item.getEntitledMethod() === EntitledMethod.QUANTITY;
      })
      .filter(item => StringUtils.search(keyword, item.getTitle()));
  }, [keyword, suggestedDiscounts]);

  const listGiftOrder = useMemo(() => {
    return suggestedDiscounts
      .filter(item => {
        return item.getEntitledMethod() === EntitledMethod.ORDER_THRESHOLD;
      })
      .filter(item => StringUtils.search(keyword, item.getTitle()));
  }, [keyword, suggestedDiscounts]);

  const isEmpty = useMemo(() => {
    if (
      (keyword === '' && suggestedDiscounts.length === 0) ||
      (listGiftOrder.length === 0 && listGiftProduct.length === 0)
    ) {
      return true;
    }
    return false;
  }, [keyword, listGiftOrder.length, listGiftProduct.length, suggestedDiscounts.length]);

  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        style={Style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Layout.ScreenHeaderBack
          title="Chọn chương trình quà tặng"
          children={
            <View style={Style.search}>
              <SearchInput
                autoFocus
                themeStyle="light"
                value={keyword}
                onValueChange={txt => setKeyword(txt)}
                placeholder="Tìm kiếm quà tặng"
              />
            </View>
          }
        />
        <Layout.Loading position="top" loading={loading}>
          <Layout.Error error={errorType} subTitle=" ">
            <View style={Style.list}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {isEmpty ? (
                  <View style={Style.empty}>
                    <EmptyState
                      icon={ic_not_found_promotion}
                      title="Không tìm thấy chương trình"
                    />
                  </View>
                ) : (
                  <>
                    <Typography
                      style={Style.note}
                      textType="regular"
                      color={colors.secondary.o400}
                      text="Bạn vui lòng chọn chương trình quà tặng tương ứng."
                    />
                    <ScrollView>
                      <Typography
                        style={Style.title}
                        textType="medium"
                        text="QUÀ TẶNG THEO SẢN PHẨM"
                      />
                      {listGiftProduct &&
                        listGiftProduct.length > 0 &&
                        listGiftProduct.map((item, index) => {
                          return (
                            <View style={Style.giftContainer} key={index}>
                              <GiftProgramItemView
                                disabled={order.getIsDiscountByTHRESHOLD()}
                                item={item}
                                onCheckedChange={onCheckedChange}
                                selected={
                                  giftProgramSelected?.getId() === item.getId()
                                }
                              />
                            </View>
                          );
                        })}
                      <Typography
                        style={[Style.title, Style.mt12]}
                        textType="medium"
                        text="QUÀ TẶNG THEO ĐƠN HÀNG"
                      />
                      {listGiftOrder &&
                        listGiftOrder.length > 0 &&
                        listGiftOrder.map((item, index) => {
                          return (
                            <View style={Style.giftContainer} key={index}>
                              <GiftProgramItemView
                                disabled={order.getIsDiscountByQUANTITY()}
                                item={item}
                                onCheckedChange={onCheckedChange}
                                selected={
                                  giftProgramSelected?.getId() === item.getId()
                                }
                              />
                            </View>
                          );
                        })}
                    </ScrollView>
                  </>
                )}
              </TouchableWithoutFeedback>
            </View>
            <Layout.ScreenBottom>
              <View style={Style.viewBottom}>
                <CTButton
                  onPress={onFinish}
                  text="Xác nhận"
                  font={Font.Medium}
                  disabled={!giftProgramSelected}
                />
              </View>
            </Layout.ScreenBottom>
            <SafeAreaView edges={['bottom']} />
          </Layout.Error>
        </Layout.Loading>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default PickGiftScreen;
