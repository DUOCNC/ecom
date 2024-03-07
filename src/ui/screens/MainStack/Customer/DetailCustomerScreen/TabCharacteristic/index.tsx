import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import CTLayout from 'components/CTLayout';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {TabDetailCustomerParams} from '..';
import {TabHistoryStyle, style} from './style';
import {Layout, Typography} from 'common-ui';
import {CustomerPurchasedSpecificationResponse} from 'modules/customer/models/responses';
import {CustomerService} from 'modules/customer/services';
import {
  ColorSpecification,
  MaterialSpecification,
  SizeSpecification,
  SkuSpecification,
} from 'modules/customer/models/responses/PurchasedSpecificationResponse';
import Tooltip from 'react-native-walkthrough-tooltip';
import colors from 'assets/v2/colors';

type Props = MaterialTopTabScreenProps<
  TabDetailCustomerParams,
  'Characteristic'
>;

enum ProductCategoryLv2 {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  CHILD = 'Trẻ em',
}

enum ProductCategoryLv3 {
  SHIRT = 'Áo',
  PANT = 'Quần',
}

enum Color {
  BLACK_GREY = 'ĐEN XÁM',
  YELLOW_BEIGE_ORANGE_BROW = 'VÀNG-BE-CAM-NÂU',
  GREEN = 'XANH LÁ',
  BLUE_NAVY = 'XANH NƯỚC BIỂN',
  WHITE_NUDE = 'TRẮNG CỔ ĐIỂN',
  RED_PINK_PURPLE = 'ĐỎ HỒNG TÍM',
  OTHER = 'KHÁC',
}

const ColorProperties = [
  {
    name: Color.BLACK_GREY,
    color: '#F2E9E0',
  },
  {
    name: Color.YELLOW_BEIGE_ORANGE_BROW,
    color: '#FFB92E',
  },
  {
    name: Color.GREEN,
    color: '#409A54',
  },
  {
    name: Color.BLUE_NAVY,
    color: '#1B3C93',
  },
  {
    name: Color.WHITE_NUDE,
    color: '#F2E9E0',
  },
  {
    name: Color.RED_PINK_PURPLE,
    color: '#D0385D',
  },
  {
    name: Color.OTHER,
    color: '',
  },
];

const TabCharacteristic: React.FC<Props> = ({route, navigation}: Props) => {
  const id = route.params?.id;
  const firstLoad = useRef<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | string>(false);
  const [customerPurchasedSpecification, setCustomerPurchasedSpecification] =
    useState<CustomerPurchasedSpecificationResponse | undefined>(undefined);
  const [optionSelect, setOptionSelect] = useState<ProductCategoryLv2>(
    ProductCategoryLv2.MALE,
  );

  useEffect(() => {
    if (firstLoad && id) {
      CustomerService.getCustomerPurchasedSpecification(
        id,
        res => {
          setCustomerPurchasedSpecification(res);
        },
        (res, msg) => {
          setError(msg);
        },
        () => setLoading(true),
        () => setLoading(false),
      );
    }
  }, [firstLoad, id]);

  const filterSize = (
    value: ProductCategoryLv3,
    size_data?: SizeSpecification[],
  ) => {
    if (!size_data) return null;

    return size_data?.filter(item => item.productCategoryLv3 === value);
  };

  const filterColor = (
    value: ProductCategoryLv3,
    color_data?: ColorSpecification[],
  ) => {
    if (!color_data) return null;

    return color_data?.filter(
      item =>
        item.productCategoryLv3 === value && item.mainColor !== Color.OTHER,
    );
  };

  const findColorProperties = (value: string) => {
    return ColorProperties.filter(item => item.name === value)?.[0];
  };

  const content = ({
    color_data,
    size_data,
    sku_3_data,
    material_data,
  }: {
    color_data?: ColorSpecification[] | undefined;
    size_data?: SizeSpecification[] | undefined;
    sku_3_data?: SkuSpecification[] | undefined;
    material_data?: MaterialSpecification[] | undefined;
  }) => {
    const sizeShirt = filterSize(ProductCategoryLv3.SHIRT, size_data);
    const sizePant = filterSize(ProductCategoryLv3.PANT, size_data);
    const colorShirt = filterColor(ProductCategoryLv3.SHIRT, color_data);
    const colorPant = filterColor(ProductCategoryLv3.PANT, color_data);
    return (
      <ScrollView>
        <View style={style.row}>
          <View style={style.left}>
            <View style={[style.progressWrapper, style.vertical]}>
              <Typography text="Size" />
              {size_data && size_data?.length > 0 ? (
                <View style={style.progressVertical}>
                  <View style={style.progressVerticalCol}>
                    <View style={style.progressContent}>
                      {sizeShirt &&
                        sizeShirt?.length > 0 &&
                        sizeShirt?.map(item => (
                          <View style={style.size}>
                            <View
                              style={[
                                style.progress,
                                {
                                  height: Number(item.percentage) * 100,
                                },
                              ]}
                            />
                            <Typography
                              text={item.size}
                              type="h6"
                              color={colors.secondary.o900}
                            />
                          </View>
                        ))}
                    </View>
                    <Typography text={ProductCategoryLv3.SHIRT} />
                  </View>
                  <View style={style.progressVerticalCol}>
                    <View style={style.progressContent}>
                      {sizePant &&
                        sizePant?.length > 0 &&
                        sizePant?.map(item => (
                          <View style={style.size}>
                            <View
                              style={[
                                style.progress,
                                {
                                  height: Number(item.percentage) * 100,
                                },
                              ]}
                            />
                            <Typography
                              text={item.size}
                              type="h6"
                              color={colors.secondary.o900}
                            />
                          </View>
                        ))}
                    </View>
                    <Typography text={ProductCategoryLv3.PANT} />
                  </View>
                </View>
              ) : (
                <Typography
                  color={colors.secondary.o500}
                  text="Không có dữ liệu"
                  type="h5"
                />
              )}
            </View>
          </View>
          <View style={style.right}>
            <View style={[style.progressWrapper, style.vertical]}>
              <Typography text="Màu" />
              {colorShirt && colorShirt?.length > 0 ? (
                <View style={style.progressVertical}>
                  <View style={style.progressVerticalCol}>
                    <View style={style.progressContent}>
                      {colorShirt?.map(item => {
                        const colorProperties = findColorProperties(
                          item.mainColor,
                        );

                        if (!colorProperties) {
                          return null;
                        }

                        return (
                          <View
                            style={[
                              style.progress,
                              {
                                height: Number(item.percentage) * 100,
                                backgroundColor: colorProperties.color,
                              },
                            ]}
                          />
                        );
                      })}
                    </View>
                    <Typography text={ProductCategoryLv3.SHIRT} />
                  </View>
                  <View style={style.progressVerticalCol}>
                    <View style={style.progressContent}>
                      {colorPant?.map(item => {
                        const colorProperties = findColorProperties(
                          item.mainColor,
                        );

                        if (!colorProperties) {
                          return null;
                        }

                        return (
                          <Tooltip
                            placement="top"
                            content={
                              <View
                                style={[
                                  style.progress,
                                  {
                                    height: Number(item.percentage) * 100,
                                    backgroundColor: colorProperties.color,
                                  },
                                ]}
                              />
                            }
                          />
                        );
                      })}
                    </View>
                    <Typography text={ProductCategoryLv3.PANT} />
                  </View>
                </View>
              ) : (
                <Typography
                  color={colors.secondary.o500}
                  text="Không có dữ liệu"
                  type="h5"
                />
              )}
            </View>
          </View>
        </View>
        <View style={style.row}>
          <View style={style.left}>
            <View
              style={[
                style.progressWrapper,
                sku_3_data && sku_3_data?.length > 0
                  ? style.horizontal
                  : style.vertical,
              ]}>
              <Typography text="Danh mục" />
              {sku_3_data && sku_3_data?.length > 0 ? (
                <View style={style.progressHorizontal}>
                  {sku_3_data?.map(item => (
                    <View>
                      <Typography
                        text={item.sku3Name}
                        type="h6"
                        color={colors.secondary.o900}
                      />
                      <View
                        style={[
                          style.progressItem,
                          {
                            width: Number(
                              item.percentage * style.progressItem.width,
                            ),
                          },
                        ]}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <Typography
                  color={colors.secondary.o500}
                  text="Không có dữ liệu"
                  type="h5"
                />
              )}
            </View>
          </View>
          <View style={style.right}>
            <View
              style={[
                style.progressWrapper,
                material_data && material_data?.length > 0
                  ? style.horizontal
                  : style.vertical,
              ]}>
              <Typography text="Chất liệu" />
              {material_data && material_data?.length > 0 ? (
                <View style={style.progressHorizontal}>
                  {material_data?.map(item => (
                    <View>
                      <Typography
                        text={item.materialName}
                        type="h6"
                        color={colors.secondary.o900}
                      />
                      <View
                        style={[
                          style.progressItem,
                          {
                            width: Number(
                              item.percentage * style.progressItem.width,
                            ),
                          },
                        ]}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <Typography
                  color={colors.secondary.o500}
                  text="Không có dữ liệu"
                  type="h5"
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const filterDataByProductCategoryLv2 = (value: ProductCategoryLv2) => {
    let data: {
      color_data?: ColorSpecification[];
      size_data?: SizeSpecification[];
      sku_3_data?: SkuSpecification[];
      material_data?: MaterialSpecification[];
    } = {
      color_data: customerPurchasedSpecification?.colorData?.filter(
        item => item.productCategoryLv2 === value,
      ),
      size_data: customerPurchasedSpecification?.sizeData?.filter(
        item => item.productCategoryLv2 === value,
      ),
      material_data: customerPurchasedSpecification?.materialData?.filter(
        item => item.productCategoryLv2 === value,
      ),
      sku_3_data: customerPurchasedSpecification?.sku3Data?.filter(
        item => item.productCategoryLv2 === value,
      ),
    };

    return data;
  };

  const tabComponent = () => {
    if (optionSelect === ProductCategoryLv2.FEMALE) {
      return content(filterDataByProductCategoryLv2(ProductCategoryLv2.FEMALE));
    }
    if (optionSelect === ProductCategoryLv2.CHILD) {
      return content(filterDataByProductCategoryLv2(ProductCategoryLv2.CHILD));
    }
    return content(filterDataByProductCategoryLv2(ProductCategoryLv2.MALE));
  };
  return (
    <CTLayout.Body>
      <Layout.Loading loading={loading}>
        <View style={TabHistoryStyle.body}>
          <View style={TabHistoryStyle.container}>
            <Typography
              text="CHI TIẾT THEO GIỚI TÍNH"
              textType="medium"
              style={TabHistoryStyle.textGroup}
            />
            <View style={[[style.rowOption]]}>
              <TouchableOpacity
                style={[
                  style.option,
                  optionSelect !== ProductCategoryLv2.MALE &&
                    style.optionTransparent,
                ]}
                onPress={() => {
                  setOptionSelect(ProductCategoryLv2.MALE);
                }}>
                <Typography
                  type="h5"
                  color={
                    optionSelect === ProductCategoryLv2.MALE
                      ? colors.base.white
                      : colors.primary.o500
                  }
                  text="Nam"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.option,
                  optionSelect !== ProductCategoryLv2.FEMALE &&
                    style.optionTransparent,
                ]}
                onPress={() => {
                  setOptionSelect(ProductCategoryLv2.FEMALE);
                }}>
                <Typography
                  type="h5"
                  color={
                    optionSelect === ProductCategoryLv2.FEMALE
                      ? colors.base.white
                      : colors.primary.o500
                  }
                  text="Nữ"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.option,
                  optionSelect !== ProductCategoryLv2.CHILD &&
                    style.optionTransparent,
                ]}
                onPress={() => {
                  setOptionSelect(ProductCategoryLv2.CHILD);
                }}>
                <Typography
                  type="h5"
                  color={
                    optionSelect === ProductCategoryLv2.CHILD
                      ? colors.base.white
                      : colors.primary.o500
                  }
                  text="Trẻ em"
                />
              </TouchableOpacity>
            </View>
            {tabComponent()}
          </View>
        </View>
      </Layout.Loading>
    </CTLayout.Body>
  );
};

export default TabCharacteristic;
