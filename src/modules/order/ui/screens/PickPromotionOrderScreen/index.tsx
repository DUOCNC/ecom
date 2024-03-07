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
import {orderService} from 'modules/order/services';
import {Font} from 'components/Base/Text';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  OrderEntity,
  SuggestedDiscountEntity,
} from 'modules/order/models/entities';
import {StringUtils} from 'common';
import {colors} from 'assets/v2';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_search_error, ic_not_found_promotion} from 'assets/images';
import PromotionItemOrderView from 'modules/order/ui/views/PromotionItemOrderView';
import {showSuccess} from 'utils/ToastUtils';
import ApplyDiscountEntity from 'modules/order/models/entities/ApplyDiscountEntity';

type Props = MainStackScreenProps<'PickPromotionOrder'>;
const descriptionDefault =
  'Bạn có thể chọn một chương trình chiết khấu gợi ý bên dưới hoặc nhập mã coupon vào ô tìm kiếm.';

const PickPromotionOrderScreen: React.FC<Props> = ({navigation, route}) => {
  const [notFoundApplyDiscount, setNotFoundApplyDiscount] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(
    descriptionDefault,
  );
  const {order} = route.params;
  const [discountItem, setDiscountItem] =
    useState<Array<SuggestedDiscountEntity | ApplyDiscountEntity>>();
  const [suggestedDiscountSelected, setSuggestedDiscountSelected] = useState<
    Array<SuggestedDiscountEntity> | Array<ApplyDiscountEntity>
  >([]);
  const bottom = useSafeAreaInsets().bottom;
  const [loading, setLoading] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<ErrorType | false>(false);
  const [errorTitle, setErrorTitle] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getCouponsOrder = (pOrder: OrderEntity) => {
    orderService.getDiscountOrder(
      pOrder,
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
    getCouponsOrder(order);
  }, [order]);
  const onRefresh = () => {
    if (refreshing || loading) {
      return;
    }
    orderService.getDiscountOrder(
      order,
      res => {
        setErrorType(false);
        setDiscountItem(res);
      },
      (type, mess) => {
        setErrorType(false);
        setErrorTitle(mess);
      },
      () => setRefreshing(true),
      () => setRefreshing(false),
    );
  };

  const dataFilter = useMemo(() => {
    if (discountItem) {
      if (keyword.trim() === '') {
        return discountItem;
      }
      return discountItem.filter(v =>
        StringUtils.search(keyword, v.getTitle()),
      );
    }
    if (keyword.trim() === '') {
      setErrorType('SearchNotfound');
      setErrorTitle('Không có chương trình khuyến mãi nào');
    }
    return [];
  }, [discountItem, keyword]);

  const onCheckedChange = (checked: boolean, item: SuggestedDiscountEntity) => {
    Keyboard.dismiss();
    const index = suggestedDiscountSelected.findIndex(
      e => e.getPriceRuleId() === item.getPriceRuleId(),
    );
    if (!checked) {
      suggestedDiscountSelected.splice(index, 1);
      setSuggestedDiscountSelected([...suggestedDiscountSelected]);
      return;
    } else {
      setSuggestedDiscountSelected(prev => [...prev, item]);
    }
  };

  useEffect(() => {
    if (order.getSuggestedDiscounts().length > 0) {
      setSuggestedDiscountSelected(order.getSuggestedDiscounts());
    }
  }, [order]);

  const onFinish = useCallback(
    (selected: Array<SuggestedDiscountEntity> | Array<ApplyDiscountEntity>) => {
      if (selected) {
        selected.filter(e => {
          if (e.getCode()) {
            showSuccess('Áp dụng mã coupon thành công.');
          }
        });
      }
      const selects = selected.map(e => {
        e.setManual(true);
        return e;
      });
      const newOrder = OrderEntity.clone(order);
      newOrder.setSuggestedDiscountsEntity(selects);
      navigation.navigate(MainRouteConfig.PosCreate, {
        order: newOrder,
      });
    },
    [navigation, order],
  );
  const handleAppliedDiscount = useCallback(() => {
    if (keyword) {
      orderService.getDiscountOrder(
        order,
        res => {
          if (res.length > 0 && res[0].getInvalid()) {
            setNotFoundApplyDiscount(true);
            setDescription(res[0].getInvalidDescription());
            return;
          }
          const newSuggested = SuggestedDiscountEntity.createFromApplyDiscount(
            res[0] as ApplyDiscountEntity,
          );
          setErrorType(false);
          onFinish([...order.getSuggestedDiscounts(), newSuggested]);
        },
        () => {
          setNotFoundApplyDiscount(true);
          setDescription(
            'Rất tiếc! Không thể tìm thấy mã voucher này. Vui lòng kiểm tra lại mã và hạn sử dụng.',
          );
          setErrorType(false);
          setErrorTitle('');
        },
        () => {
          setLoading(true);
        },
        () => {
          setLoading(false);
        },
        keyword,
      );
    }
  }, [keyword, onFinish, order]);
  const handleChangeKeyword = (txt: string) => {
    setKeyword(txt);
    setDescription(descriptionDefault);
    setNotFoundApplyDiscount(false);
  };
  //
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

  const getChecked = (item: SuggestedDiscountEntity | ApplyDiscountEntity) => {
    if (!suggestedDiscountSelected) {
      return false;
    }
    return (
      suggestedDiscountSelected.findIndex(
        e => e.getPriceRuleId() === item.getPriceRuleId(),
      ) !== -1
    );
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        style={Style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Layout.ScreenHeaderBack
          title="Khuyến mại đơn hàng"
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
                  textStyle={Style.textStyleButton}
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
            error={errorType}
            subTitle=" "
            title={errorTitle}
            image={ic_not_found_promotion}>
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
                        <PromotionItemOrderView
                          order={order}
                          discount={item}
                          onCheckedChange={onCheckedChange}
                          selected={getChecked(item)}
                        />
                      </View>
                    )}
                  />
                )}
              </TouchableWithoutFeedback>
            </View>
          </Layout.Error>
        </Layout.Loading>
        <Layout.ScreenBottom>
          <View style={Style.viewBottom}>
            <CTButton
              onPress={() => {
                onFinish(suggestedDiscountSelected);
              }}
              text="Chọn xong"
              font={Font.Medium}
            />
          </View>
        </Layout.ScreenBottom>
        <SafeAreaView edges={['bottom']} />
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default PickPromotionOrderScreen;
