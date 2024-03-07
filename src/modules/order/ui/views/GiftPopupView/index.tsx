import {bg_search_error, ic_close, ic_not_found_promotion} from 'assets/images';
import {CTButton, CTButtonIcon} from 'components/Button';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Keyboard, RefreshControl, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {
  DimentionUtils,
  FlatListItemControl,
  Layout,
  SearchInput,
  Typography,
  useBottomSheetBackHandler,
} from 'common-ui';
import Style from './style';
import {OrderLineEntity} from 'modules/order/models';
import {colors} from 'assets/v2';
import EmptyState from 'components/CTScreen/EmptyState';
import {orderService} from 'modules/order/services';
import ScreenBottom from 'common-ui/components/Layout/ScreenBottom';
import {Font} from 'components/Base/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import GiftPopupItemView from '../GiftPopupItemView';
import {ThemeStyle} from 'assets/theme';
import _ from 'lodash';
import {useAuth} from 'providers/contexts/AuthContext';

interface Props {
  onFinishSelect: (selected: Array<OrderLineEntity>) => void;
}
export type GiftPopupRef = {
  open: () => void;
  close: () => void;
  setGiftSelected: (giftSelected: Array<OrderLineEntity>) => void;
};

export type GiftPopupComponent = ForwardRefRenderFunction<GiftPopupRef, Props>;

const GiftPopupView: GiftPopupComponent = ({onFinishSelect}, ref) => {
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);
  const [isLoadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const modalRef = createRef<BottomSheetModal>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {locationSelected} = useAuth();
  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };
  const [giftSelectedEntity, setGiftSelectedEntity] = useState<
    Array<OrderLineEntity>
  >([]);
  const [giftEntity, setGiftEntity] = useState<Array<OrderLineEntity>>([]);
  const onGiftSelected = (s: Array<OrderLineEntity>) => {
    setGiftSelectedEntity(s);
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    setGiftSelected: onGiftSelected,
  }));

  useEffect(() => {
    if (keyword === '') {
      setGiftEntity([]);
      setPage(1);
      return;
    }
    let timeOut = setTimeout(() => {
      orderService.getGifts(
        [locationSelected.locationId],
        {
          page: 1,
          limit: 7,
          info: keyword,
        },
        () => setLoading(true),
        (res, rsPage: number, rsCanLoadMore) => {
          setGiftEntity(res);
          setPage(rsPage);
          setCanLoadMore(rsCanLoadMore);
        },
        () => {},
        () => setLoading(false),
      );
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [keyword, locationSelected]);

  const onRefresh = () => {
    if (refreshing || isLoadMore || loading) {
      return;
    }
    orderService.getGifts(
      [locationSelected.locationId],
      {
        page: 1,
        limit: 7,
        info: keyword,
      },
      () => setRefreshing(true),
      (res, rsPage: number, rsCanLoadMore) => {
        setGiftEntity([...giftEntity, ...res]);
        setPage(rsPage);
        setCanLoadMore(rsCanLoadMore);
      },
      () => {},
      () => setRefreshing(false),
    );
  };

  const onLoadMore = () => {
    if (isLoadMore || !canLoadMore || loading) {
      return;
    }
    orderService.getGifts(
      [locationSelected.locationId],
      {
        page: page + 1,
        limit: 7,
        info: keyword,
      },
      () => setLoadMore(true),
      (res, rsPage: number, rsCanLoadMore) => {
        setGiftEntity([...giftEntity, ...res]);
        setPage(rsPage);
        setCanLoadMore(rsCanLoadMore);
      },
      () => {},
      () => setLoadMore(false),
    );
  };

  const onCheckedChange = (checked: boolean, item: OrderLineEntity) => {
    let index = giftSelectedEntity.findIndex(
      i => i.getVariantId() === item.getVariantId(),
    );
    if (checked) {
      if (index === -1) {
        giftSelectedEntity.unshift(item);
        setGiftSelectedEntity([...giftSelectedEntity]);
      }
      return;
    }
    if (index !== -1) {
      giftSelectedEntity.splice(index, 1);
      setGiftSelectedEntity([...giftSelectedEntity]);
    }
  };

  const onFinish = () => {
    onClose();
    onFinishSelect(_.cloneDeep(giftSelectedEntity));
  };
  return (
    <BottomSheetModal
      index={0}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      onChange={handleSheetPositionChange}
      handleComponent={null}
      onDismiss={Keyboard.dismiss}
      snapPoints={[DimentionUtils.scale(532)]}
      ref={modalRef}>
      <View style={Style.container}>
        <View style={Style.header}>
          <CTButtonIcon
            onPress={onClose}
            style={Style.icClose}
            icon={ic_close}
            iconStyle={Style.iconClose}
          />
          <Typography
            textType="medium"
            text="Chọn quà tặng"
            type="h3"
            color={colors.secondary.o900}
          />
        </View>
        <View style={[Style.body]}>
          <View style={Style.search}>
            <SearchInput
              themeStyle="light"
              value={keyword}
              onValueChange={txt => setKeyword(txt)}
              placeholder="Tìm kiếm"
            />
          </View>
          <Layout.Loading position="top" loading={loading}>
            <View style={Style.list}>
              {keyword === '' && (
                <View style={Style.empty}>
                  <EmptyState
                    icon={ic_not_found_promotion}
                    title="Tìm kiếm quà tặng"
                  />
                </View>
              )}
              {keyword !== '' && giftEntity && giftEntity.length === 0 && (
                <View style={Style.empty}>
                  <EmptyState
                    icon={bg_search_error}
                    title="Không tìm thấy kết quả."
                  />
                </View>
              )}
              {giftEntity && giftEntity.length > 0 && (
                <BottomSheetFlatList
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
                  data={giftEntity}
                  onEndReachedThreshold={0.8}
                  onEndReached={onLoadMore}
                  ItemSeparatorComponent={() => (
                    <View style={ThemeStyle.separator} />
                  )}
                  ListFooterComponent={
                    <FlatListItemControl.LoadMore isLoadMore={isLoadMore} />
                  }
                  renderItem={({item, index}) => (
                    <View key={index}>
                      <GiftPopupItemView
                        item={item}
                        onCheckedChange={onCheckedChange}
                        selected={
                          giftSelectedEntity.findIndex(
                            i => i.getVariantId() === item.getVariantId(),
                          ) !== -1
                        }
                      />
                    </View>
                  )}
                />
              )}
            </View>
          </Layout.Loading>
        </View>
      </View>
      <ScreenBottom>
        <View style={Style.viewBottom}>
          <CTButton onPress={onFinish} text="Chọn xong" font={Font.Medium} />
        </View>
      </ScreenBottom>
      <SafeAreaView edges={['bottom']} />
    </BottomSheetModal>
  );
};

export default forwardRef(GiftPopupView);
