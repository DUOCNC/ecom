import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {Colors} from 'assets/colors';
import {bg_search_error} from 'assets/images';
import {colors} from 'assets/v2';
import {ErrorType, FlatListItemControl, Layout, Typography} from 'common-ui';
import {enumBinLocation} from 'common/enums';
import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import CTFLastList from 'components/CTFlatList';
import EmptyState from 'components/CTScreen/EmptyState';
import BinLocationEntity from 'modules/product/models/entities/BinLocationEntity';
import {inventoryService} from 'modules/product/services';
import {useAuth} from 'providers/contexts/AuthContext';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from 'ui/screens/MainStack';
import ProductPositioningItem from '../ProductPositioningItemView/ProductPositioningItem';
import style from './style';
import _ from 'lodash';
import {useAppDispatch} from 'hook';
import {hideModal, showConfirm} from 'reduxs/Modals/ModalReducer';
import {StringUtils} from 'common';

interface Props {
  route: RouteProp<RootStackParamList, 'ProductPositioning'>;
}
const AllProductPositioning: React.FC<Props> = ({route}) => {
  //page hooks
  const {params} = route;
  const items = params?.items ?? null;
  const {locationSelected, profile} = useAuth();
  const locationId = locationSelected.locationId;
  //page state
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [binLocations, setBinLocations] = useState<Array<BinLocationEntity>>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<false | ErrorType>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [optionSelect, setOptionSelect] = useState<enumBinLocation>(
    enumBinLocation.showroom,
  );
  const dispatch = useAppDispatch();

  const onError = useCallback((er: ErrorType, msgError: string) => {
    setError(er);
    setMsgError(msgError);
    setLoading(false);
  }, []);

  const onCheckboxItem = (item: BinLocationEntity) => {
    const result = BinLocationEntity.onChangeCheckBoxItem(binLocations, item);
    const result2 = Object.values(Object.assign({}, result));
    setBinLocations(result2);
  };

  const totalQuantityBins = useMemo(() => {
    let total = 0;
    binLocations.forEach(item => {
      total = total + item.getQuantity();
    });
    return total;
  }, [binLocations]);

  const totalQuantityBinsCheck = useMemo(() => {
    let total = 0;
    binLocations
      .filter(item => item.getCheckBox())
      .forEach(item => {
        total = total + item.getQuantity();
      });
    return total;
  }, [binLocations]);

  const onChangeQuantityItem = (item: BinLocationEntity, value: number) => {
    const result = BinLocationEntity.onChangeQuantityItem(
      binLocations,
      item,
      value,
    );
    const result2 = Object.values(Object.assign({}, result));
    setBinLocations(result2);
  };

  const onChangeOptionSelect = (value: enumBinLocation) => {
    setOptionSelect(value);
  };

  const checkInventory = (type: enumBinLocation, data: BinLocationEntity[]) => {
    if (type === enumBinLocation.showroom) {
      const bins = data.filter(e => {
        if (e.getStorage() < e.getQuantity()) {
          return e.getSku();
        }
      });
      if (bins && bins.length > 0) {
        dispatch(
          showConfirm({
            title: 'Có lỗi xảy ra',
            message: StringUtils.format(
              'Các mã không đủ tồn kho lưu trữ: {0}',
              bins.map(e => e.getSku()).join(', '),
            ),
            okText: 'Đóng',
            onOk: () => {
              dispatch(hideModal());
            },
            isDisableCancelButton: true,
          }),
        );
        return false;
      }
    }
    if (type === enumBinLocation.storage) {
      const bins = data.filter(e => {
        if (e.getShowroom() < e.getQuantity()) {
          return e.getSku();
        }
      });
      if (bins && bins.length > 0) {
        dispatch(
          showConfirm({
            title: 'Có lỗi xảy ra',
            message: StringUtils.format(
              'Các mã sau không đủ tồn trưng bày: {0}',
              bins.map(e => e.getSku()).join(', '),
            ),
            okText: 'Đóng',
            onOk: () => {
              dispatch(hideModal());
            },
            isDisableCancelButton: true,
          }),
        );
        return false;
      }
    }
    return true;
  };

  const onUpdateBinLocation = () => {
    const bins = binLocations.filter(item => item.getCheckBox());
    //Kiểm tra có tồn tại sản phẩm k có tồn trưng bày, tồn kho lưu trữ
    if (!checkInventory(optionSelect, bins)) {
      return;
    }
    inventoryService.updateBinLocationToStore(
      bins,
      optionSelect,
      optionSelect === enumBinLocation.storage
        ? enumBinLocation.showroom
        : enumBinLocation.storage,
      locationId,
      profile,
      res => {
        const result = binLocations.filter(bin => !bin.getCheckBox());
        const result2 = Object.values(Object.assign({}, result));
        setBinLocations(result2);
      },
      () => setLoading(true),
      () => setLoading(false),
      onError,
    );
  };

  useEffect(() => {
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const itemBin = items[i];
        const index = binLocations.findIndex(
          bin => bin.getSku() === itemBin.getSku(),
        );
        if (index === -1) {
          binLocations.unshift(itemBin);
        } else {
          itemBin.setQuantity(binLocations[index].getQuantity() + 1);
          binLocations[index] = itemBin;
        }
      }

      const result2 = _.cloneDeep(binLocations);
      setBinLocations(result2);
      navigation.setParams({keyword: '', items: null});
    }
  }, [binLocations, items, navigation]);

  return (
    <View style={style.container}>
      <View style={style.row}>
        <TouchableOpacity
          style={[
            style.option,
            optionSelect !== enumBinLocation.showroom &&
              style.optionTransparent,
          ]}
          onPress={() => {
            onChangeOptionSelect(enumBinLocation.storage);
          }}>
          <Typography
            type="h4"
            color={
              optionSelect === enumBinLocation.showroom
                ? Colors.White
                : colors.secondary.o900
            }
            text=" Chuyển trưng bày"
            onPress={() => {
              onChangeOptionSelect(enumBinLocation.showroom);
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.option,
            optionSelect !== enumBinLocation.storage && style.optionTransparent,
          ]}
          onPress={() => {
            onChangeOptionSelect(enumBinLocation.storage);
          }}>
          <Typography
            type="h4"
            color={
              optionSelect === enumBinLocation.storage
                ? Colors.White
                : colors.secondary.o900
            }
            text="Chuyển vào kho"
          />
        </TouchableOpacity>
      </View>
      <View style={style.header}>
        <View style={style.headerLeft}>
          <Typography
            type="h3"
            text={`Các sản phẩm cần bổ sung (${totalQuantityBins})`}
            textType="medium"
            color={colors.secondary.o900}
          />
        </View>
      </View>
      <Layout.Loading position="top" loading={loading}>
        <Layout.Error subTitle={msgError} error={error}>
          <CTFLastList
            refreshControl={<RefreshControl refreshing={false} />}
            bounces={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.getSku()}
            data={binLocations}
            onEndReachedThreshold={0.8}
            ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
            ListFooterComponent={
              <FlatListItemControl.LoadMore isLoadMore={false} />
            }
            renderItem={({item}) => (
              <ProductPositioningItem
                data={item}
                onCheckbox={onCheckboxItem}
                onChangeQuantityItem={onChangeQuantityItem}
              />
            )}
            emptyView={
              <EmptyState
                icon={bg_search_error}
                title="Không có sản phẩm nào!"
                subTitle={`Quét mã hoặc tìm kiếm các sản phẩm ${
                  optionSelect === enumBinLocation.showroom
                    ? 'cần trưng bày.'
                    : 'cần đưa vào kho.'
                } `}
              />
            }
          />
        </Layout.Error>
      </Layout.Loading>
      <Layout.ScreenBottom>
        <View style={style.viewBottom}>
          <CTButton
            onPress={onUpdateBinLocation}
            text={
              optionSelect === enumBinLocation.showroom
                ? `Trưng bày (${totalQuantityBinsCheck}) sản phẩm được chọn`
                : `Chuyển (${totalQuantityBinsCheck}) sản phẩm vào kho`
            }
            font={Font.Medium}
            disabled={
              !binLocations.filter(item => item.getCheckBox()).length ||
              totalQuantityBinsCheck === 0
            }
          />
        </View>
      </Layout.ScreenBottom>
    </View>
  );
};

export default AllProductPositioning;
