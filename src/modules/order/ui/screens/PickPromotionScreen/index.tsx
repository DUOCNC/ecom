import {CTButton} from 'components/Button';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  View,
} from 'react-native';
import {ErrorType, Layout, SearchInput, Typography} from 'common-ui';
import Style from './style';
import {OrderLineEntity} from 'modules/order/models';
import {orderService} from 'modules/order/services';
import {Font} from 'components/Base/Text';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  DiscountItemEntity,
  OrderEntity,
  SuggestedDiscountEntity,
} from 'modules/order/models/entities';
import {PromotionItemView} from '../../views';
import {StringUtils} from 'common';
import {colors} from 'assets/v2';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_search_error, ic_not_found_promotion} from 'assets/images';
import {useAuth} from 'providers/contexts/AuthContext';
import {showSuccess} from 'utils/ToastUtils';

type Props = MainStackScreenProps<'PickPromotion'>;
const descriptionDefault =
  'Bạn có thể chọn một chương trình chiết khấu gợi ý bên dưới hoặc nhập mã coupon vào ô tìm kiếm.';

const PickPromotionScreen: React.FC<Props> = ({navigation, route}) => {
  const [notFoundApplyDiscount, setNotFoundApplyDiscount] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>(descriptionDefault);
  const {order, lineItem, lineIndex, isNew} = route.params;
  const [discountItem, setDiscountItem] = useState<DiscountItemEntity>();
  const [suggestedDiscountSelected, setSuggestedDiscountSelected] =
    useState<SuggestedDiscountEntity>();
  const bottom = useSafeAreaInsets().bottom;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType | false>(false);
  const [errorTitle, setErrorTitle] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {locationSelected} = useAuth();

  const getSuggestedDiscounts = (
    pLineItem: OrderLineEntity,
    pOrder: OrderEntity,
  ) => {
    if (!pOrder) {
      pOrder = OrderEntity.createEmpty(locationSelected.locationId);
    }
    orderService.getSuggestedDiscounts(
      pOrder,
      pLineItem,
      res => {
        setErrorType(false);
        setDiscountItem(res);
      },
      (rsCode, rsMsg) => {
        setErrorType(rsCode);
        setErrorTitle(rsMsg);
      },
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    getSuggestedDiscounts(lineItem, order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItem, order]);

  const onRefresh = () => {
    if (refreshing || loading) {
      return;
    }
    orderService.getSuggestedDiscounts(
      order,
      lineItem,
      res => {
        setErrorType(false);
        setDiscountItem(res);
      },
      (type, mess) => {
        setErrorType(type);
        setErrorTitle(mess);
      },
      () => setRefreshing(true),
      () => setRefreshing(false),
    );
  };

  const dataFilter = useMemo(() => {
    if (discountItem && discountItem.getSuggestedDiscounts()) {
      if (keyword.trim() === '') {
        return discountItem.getSuggestedDiscounts();
      }
      return discountItem
        .getSuggestedDiscounts()
        .filter(v => StringUtils.search(keyword, v.getTitle()));
    }
    if (keyword.trim() === '') {
      setErrorType('SearchNotfound');
      setErrorTitle('Không có chương trình khuyến mãi nào');
    }
    return [];
  }, [discountItem, keyword]);

  const onCheckedChange = (checked: boolean, item: SuggestedDiscountEntity) => {
    Keyboard.dismiss();
    if (!checked) {
      setSuggestedDiscountSelected(undefined);
      onFinish(discountItem, undefined);
      return;
    }
    setSuggestedDiscountSelected(item);
    onFinish(discountItem, item);
  };

  useEffect(() => {
    if (lineItem) {
      const oldDiscount = lineItem.getDiscountItems()[0];
      if (oldDiscount) {
        setSuggestedDiscountSelected(oldDiscount.getSuggestedDiscounts()[0]);
      }
    }
  }, [lineItem]);

  const onFinish = useCallback(
    (discounts?: DiscountItemEntity, suggest?: SuggestedDiscountEntity) => {
      const newOrderItem = OrderLineEntity.clone(lineItem);
      if (discounts) {
        if (suggest) {
          discounts.setSuggestedDiscounts([suggest]);
          const discountItemSelected = DiscountItemEntity.clone(discounts);
          newOrderItem.setDiscountItems([discountItemSelected]);
          showSuccess('Thêm mã khuyến mại thành công');
        } else {
          newOrderItem.setDiscountItems([]);
        }
      }
      navigation.navigate(MainRouteConfig.PosCreate, {
        lineItem: {item: newOrderItem, index: lineIndex, isNew: isNew},
      });
    },
    [isNew, lineIndex, lineItem, navigation],
  );
  const handleAppliedDiscount = useCallback(() => {
    if (!keyword) {
      return;
    }
    orderService.getCoupons(
      order,
      lineItem,
      keyword,
      res => {
        setErrorType(false);
        const applyDiscount = res.getApplyDiscount();
        if (applyDiscount) {
          if (applyDiscount.getInvalid()) {
            setNotFoundApplyDiscount(true);
            setDescription(applyDiscount.getInvalidDescription());
            return;
          }
          applyDiscount.setManual(true);
          const newSuggested =
            SuggestedDiscountEntity.createFromApplyDiscount(applyDiscount);
          onFinish(res, newSuggested);
        } else {
          setNotFoundApplyDiscount(true);
          setDescription(
            'Rất tiếc! Không thể tìm thấy mã voucher này. Vui lòng kiểm tra lại mã và hạn sử dụng.',
          );
        }
      },
      (rsCode, rsMsg) => {
        setErrorType(rsCode);
        setErrorTitle(rsMsg);
      },
      () => {
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
  }, [keyword, lineItem, onFinish, order]);
  const handleChangeKeyword = (txt: string) => {
    setKeyword(txt);
    setNotFoundApplyDiscount(false);
    setDescription(descriptionDefault);
  };

  const descriptionView = useMemo(() => {
    if (notFoundApplyDiscount) {
      return (
        <View style={Style.description}>
          <Typography type="h4" color={colors.error.o500} text={description} />
        </View>
      );
    }
    return (
      <View style={Style.description}>
        <Typography type="h4" color={colors.primary.o500} text={description} />
      </View>
    );
  }, [description, notFoundApplyDiscount]);

  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        style={Style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Layout.ScreenHeaderBack
          title="Chương trình chiết khấu"
          children={
            <React.Fragment>
              <View style={Style.rowSearch}>
                <View style={Style.search}>
                  <SearchInput
                    themeStyle="light"
                    value={keyword}
                    onValueChange={txt => handleChangeKeyword(txt)}
                    placeholder="Nhập và tìm chiết khấu"
                  />
                </View>
                <CTButton
                  onPress={handleAppliedDiscount}
                  style={Style.buttonAdd}
                  textStyle={{color: colors.secondary.o900}}
                  text="Quay mã"
                  type="plain"
                  font={Font.Medium}
                  level="4"
                />
              </View>
              {descriptionView}
            </React.Fragment>
          }
        />
        <Layout.Loading position="top" loading={loading}>
          {keyword !== '' && dataFilter.length === 0 && (
            <View style={Style.empty}>
              <EmptyState
                icon={bg_search_error}
                title="Không tìm thấy kết quả."
              />
            </View>
          )}
          <Layout.Error
            image={ic_not_found_promotion}
            error={errorType}
            subTitle=" "
            title={errorTitle}>
            <View style={Style.list}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {dataFilter.length > 0 && (
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    bounces={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(e, i) => i.toString()}
                    data={dataFilter}
                    renderItem={({item, index}) => (
                      <View key={index}>
                        <PromotionItemView
                          discount={item}
                          variant={lineItem.getVariant()}
                          onCheckedChange={onCheckedChange}
                          selected={
                            suggestedDiscountSelected?.getPriceRuleId() ===
                            item.getPriceRuleId()
                          }
                        />
                      </View>
                    )}
                  />
                )}
              </TouchableWithoutFeedback>
            </View>
          </Layout.Error>
        </Layout.Loading>
        <SafeAreaView edges={['bottom']} />
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default PickPromotionScreen;
