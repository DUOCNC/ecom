import React, {useEffect, useMemo, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {TabDetailCustomerParams} from '..';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {getCustomerApi} from 'services/CustomerService/CustomerApi';
import {TabInfoCustomerStyle, style} from './style';
import * as Progress from 'react-native-progress';
import {ic_yd_point} from 'assets/images';
import NumberUtils from 'utils/NumberUtils';
import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {getLoyaltyCustomer} from 'services/LoyaltyService/LoyaltyApi';
import {LoyaltyDto} from 'model/dto/LoyaltyService/LoyaltyDto';
import CTLayout from 'components/CTLayout';
import MapCustomerToViewer from 'domain/viewer/MapCustomerToViewer';
import {ErrorView, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {ThemeStyle} from 'assets/theme';
import {PromotionType} from 'modules/customer/models/enums';
import promotionService from 'modules/customer/services/PromotionService';
import {CustomerDiscountEntity} from 'modules/customer/models/entities';
import {CustomerDiscountItemView} from 'modules/customer/ui/view';

type Props = MaterialTopTabScreenProps<TabDetailCustomerParams, 'Profile'>;
const TabInfoCustomer: React.FC<Props> = ({route}: Props) => {
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | false>(false);
  const [errorLoyalty, setErrorLoyalty] = useState<string | false>(false);
  const [loadingLoyalty, setLoadingLoyalty] = useState<boolean>(false);
  const [loadLoyalty, setLoadLoyalty] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const customerId = route.params?.customerId;
  const [customer, setCustomer] = useState<DetailCustomerDto | null>(null);
  const [loyalty, setLoyalty] = useState<LoyaltyDto | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [optionSelect, setOptionSelect] = useState<PromotionType>(
    PromotionType.Having,
  );
  const [discounts, setDiscounts] = useState<Array<CustomerDiscountEntity>>([]);
  const [discountRunning, setDiscountRunning] = useState<
    Array<CustomerDiscountEntity>
  >([]);
  const progress = useMemo(() => {
    if (loyalty) {
      let remainAmountToLevelUp = loyalty.remainAmountToLevelUp
        ? loyalty.remainAmountToLevelUp
        : 0;
      let total = remainAmountToLevelUp + loyalty.totalMoneySpend;
      if (total === 0) {
        return 0;
      }
      return loyalty.totalMoneySpend / total;
    }
    return 0;
  }, [loyalty]);
  const loyaltyMoney = useMemo(() => {
    if (loyalty) {
      return loyalty.remainAmountToLevelUp;
    }
    return 0;
  }, [loyalty]);
  const onRefresh = () => {
    if (customerId) {
      setRefreshing(true);
      getCustomerApi(
        customerId,
        detail => {
          setCustomer(detail);
          setLoadLoyalty(true);
        },
        errors => {
          setError(errors[0]);
        },
        () => {
          setRefreshing(false);
        },
      );
    }
  };

  const onReload = () => {
    setFirstLoading(true);
  };

  useEffect(() => {
    if (customerId && firstLoading) {
      getCustomerApi(
        customerId,
        detail => {
          setCustomer(detail);
          setLoadLoyalty(true);
        },
        errors => {
          setError(errors[0]);
        },
        () => {
          setFirstLoading(false);
        },
      );
      promotionService.getCustomerDiscountCodes(
        customerId,
        res => {
          setDiscounts(res);
        },
        () => {},
        () => {},
      );
    }
    return () => {};
  }, [customerId, firstLoading, refreshing]);

  console.log('discounts', discounts);

  useEffect(() => {
    if (customerId && loadLoyalty) {
      setLoadingLoyalty(true);
      getLoyaltyCustomer(
        customerId,
        loyaltyResult => {
          setLoyalty(loyaltyResult);
          setLoadLoyalty(false);
        },
        errors => {
          setErrorLoyalty(errors[0]);
        },
        () => setTimeout(() => setLoadingLoyalty(false), 1000),
      );
    }
    return () => {};
  }, [customerId, loadLoyalty]);
  let customerViewer = MapCustomerToViewer(customer);

  const replaceThreeNumbers = (
    replacement: string,
    phoneNumber?: string | null,
  ) => {
    if (!phoneNumber) {
      return undefined;
    }

    if (phoneNumber.length >= 10) {
      const prefix = phoneNumber.slice(0, phoneNumber.length - 6);
      const suffix = phoneNumber.slice(7 - phoneNumber.length);
      const maskedDigits = replacement.repeat(3);

      return prefix + maskedDigits + suffix;
    } else {
      return phoneNumber;
    }
  };

  const diffYear = (dov: string | null) => {
    if (!dov) {
      return null;
    }

    const birthDate = new Date(dov);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <CTLayout.LoadingView firstLoading={firstLoading}>
      <CTLayout.ErrorView onReloadPress={onReload} error={error}>
        <Animated.ScrollView
          contentContainerStyle={{flexGrow: 1}}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          style={TabInfoCustomerStyle.container}>
          {customerViewer && (
            <React.Fragment>
              <View style={style.card}>
                <View style={style.firstRow}>
                  <Typography
                    text={customerViewer.fullName}
                    type="h2"
                    textType="medium"
                    color={colors.primary.o700}
                    numberOfLines={2}
                    style={style.fullName}
                  />
                  {customerViewer.customerLevel && (
                    <View style={[style.tag]}>
                      <Typography
                        text={customerViewer.customerLevel}
                        color={colors.secondary.o900}
                        textType="medium"
                      />
                    </View>
                  )}
                </View>
                <Typography
                  text={StringUtils.format('{0}', customerViewer.id)}
                  color={colors.warning.o400}
                  type="h5"
                />
                <View style={style.rowInfo}>
                  <View style={style.rowInfo}>
                    <Typography
                      text="Tiền tích lũy"
                      color={colors.primary.o700}
                    />
                    <Typography
                      text={customerViewer.totalPaidAmount}
                      textType="medium"
                      type="h2"
                      style={style.ml4}
                      color={colors.primary.o700}
                    />
                  </View>
                  <View style={style.rowInfo}>
                    <Image source={ic_yd_point} />
                    <Typography
                      text={NumberUtils.formatNumber(
                        parseInt(customerViewer.point),
                      )}
                      type="h2"
                      style={style.ml4}
                      color={colors.primary.o600}
                      textType="medium"
                    />
                  </View>
                </View>
                <View style={style.rowInfo}>
                  <Progress.Bar
                    progress={progress}
                    width={normalize(343) - normalize(32) * 2}
                    style={TabInfoCustomerStyle.progress}
                    height={normalize(5)}
                    color={colors.warning.o400}
                    borderColor={colors.secondary.o400}
                  />
                </View>
                <View style={style.rowInfo}>
                  <Typography
                    text={StringUtils.format(
                      'Còn thiếu {0} để nâng hạng',
                      NumberUtils.formatCurrency(loyaltyMoney),
                    )}
                    color={colors.primary.o700}
                    textType="medium"
                  />
                </View>
              </View>
              <View
                style={[
                  style.promotion,
                  discounts.length > 0 && style.promotionHeight,
                ]}>
                <View style={[[style.row, style.rowOption]]}>
                  <TouchableOpacity
                    style={[
                      style.option,
                      optionSelect !== PromotionType.Having &&
                        style.optionTransparent,
                    ]}
                    onPress={() => {
                      setOptionSelect(PromotionType.Having);
                    }}>
                    <Typography
                      type="h5"
                      color={
                        optionSelect === PromotionType.Having
                          ? Colors.White
                          : colors.primary.o500
                      }
                      text="Mã đang có"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.option,
                      optionSelect !== PromotionType.Running &&
                        style.optionTransparent,
                    ]}
                    onPress={() => {
                      setOptionSelect(PromotionType.Running);
                    }}>
                    <Typography
                      type="h5"
                      color={
                        optionSelect === PromotionType.Running
                          ? Colors.White
                          : colors.primary.o500
                      }
                      text="Chương trình đang chạy"
                    />
                  </TouchableOpacity>
                </View>
                <View style={style.rowInfo}>
                  <Typography
                    text="MÃ KHUYẾN MẠI ĐANG CÓ"
                    textType="medium"
                    color={colors.secondary.o900}
                    style={[style.groupText, style.havingCode]}
                  />
                </View>
                {optionSelect === PromotionType.Having ? (
                  <View style={style.rowInfo}>
                    {discounts.length === 0 ? (
                      <View style={style.empty}>
                        <ErrorView
                          imageSize="small"
                          subTitle="Không có chương trình nào"
                        />
                      </View>
                    ) : (
                      <FlatList
                        style={{height: 280}}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.getCode()}
                        data={discounts}
                        renderItem={({item}) => (
                          <CustomerDiscountItemView
                            discount={item}
                            key={item.getCode()}
                          />
                        )}
                        nestedScrollEnabled={true}
                      />
                    )}
                  </View>
                ) : (
                  <View style={style.rowInfo}>
                    {discountRunning.length === 0 ? (
                      <View style={style.empty}>
                        <ErrorView
                          imageSize="small"
                          subTitle="Không có chương trình đang chạy"
                        />
                      </View>
                    ) : (
                      <FlatList
                        style={{height: 280}}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.getCode()}
                        data={discountRunning}
                        renderItem={({item}) => (
                          <CustomerDiscountItemView
                            discount={item}
                            key={item.getCode()}
                          />
                        )}
                        nestedScrollEnabled={true}
                      />
                    )}
                  </View>
                )}
              </View>
              <View style={style.card}>
                <Typography
                  text="THÔNG TIN CƠ BẢN"
                  textType="medium"
                  color={colors.secondary.o900}
                  style={style.groupText}
                />
                <View>
                  <View style={TabInfoCustomerStyle.rowInfoCard}>
                    <Typography
                      text="Số điện thoại"
                      color={colors.secondary.o500}
                    />
                    <Typography
                      color={colors.secondary.o900}
                      text={replaceThreeNumbers('*', customerViewer.phone)}
                    />
                  </View>
                  <View style={TabInfoCustomerStyle.rowInfoCard}>
                    <Typography
                      text="Ngày sinh"
                      color={colors.secondary.o500}
                    />

                    <View style={style.row}>
                      <Typography
                        color={colors.secondary.o900}
                        text={StringUtils.format(
                          '{0}',
                          customerViewer.birthday,
                        )}
                      />
                      {customer?.birthday && (
                        <Typography
                          color={colors.warning.o500}
                          text={StringUtils.format(
                            ' ({0} tuổi)',
                            diffYear(customer.birthday),
                          )}
                        />
                      )}
                    </View>
                  </View>
                  <View style={TabInfoCustomerStyle.rowInfoCard}>
                    <Typography
                      text="Giới tính"
                      color={colors.secondary.o500}
                    />
                    <Typography
                      color={colors.secondary.o900}
                      text={customerViewer.gender}
                    />
                  </View>
                  {showMore && (
                    <React.Fragment>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Email"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.email}
                        />
                      </View>
                      <View
                        style={[
                          ThemeStyle.separator,
                          TabInfoCustomerStyle.rowInfoCard,
                        ]}
                      />
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography text="Nhóm" color={colors.secondary.o500} />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.customerGroup}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Loại khách hàng"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.customerType}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Ngày cưới"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.weddingDate}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Tên đơn vị"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.company}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="CMND / CCCD"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.identityNumber}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Mã số thuế"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.taxCode}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Nhân viên phụ trách"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.responsibleStaff}
                        />
                      </View>
                      <View style={TabInfoCustomerStyle.rowInfoCard}>
                        <Typography
                          text="Ghi chú"
                          color={colors.secondary.o500}
                        />
                        <Typography
                          color={colors.secondary.o900}
                          text={customerViewer.description}
                        />
                      </View>
                    </React.Fragment>
                  )}
                  <View style={[style.rowInfo, style.showMore]}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowMore(!showMore);
                      }}>
                      <Typography
                        color={colors.primary.o700}
                        text={showMore ? 'Thu gọn' : 'Xem thêm'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </React.Fragment>
          )}
        </Animated.ScrollView>
      </CTLayout.ErrorView>
    </CTLayout.LoadingView>
  );
};

export default TabInfoCustomer;
