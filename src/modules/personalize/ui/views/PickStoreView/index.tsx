import {ic_close} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text';
import {CTButtonIcon} from 'components/Button';
import CTTypography from 'components/CTTypography';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Keyboard, TouchableOpacity, View} from 'react-native';
import {SearchInput} from 'ui/view/Common';
import StringUtils from 'utils/StringUtils';
import PickStoreStyle from './style';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {colors} from 'assets/v2';
import {Typography, useBottomSheetBackHandler} from 'common-ui';
import {useAuth} from 'providers/contexts/AuthContext';

export interface PickStoreProps {
  pick: (id: number, name: string) => void;
  storeId: number;
}

export type PickStoreRef = {
  open: () => void;
  close: () => void;
};

export type PickStoreComponent = ForwardRefRenderFunction<
  PickStoreRef,
  PickStoreProps
>;

const PickStoreView: PickStoreComponent = ({storeId, pick}, ref) => {
  const modalRef = createRef<BottomSheetModal>();
  const [keyword, setKeyword] = useState<string>('');
  const {locations} = useAuth();
  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };

  const onSelect = (pickId: number, name: string) => {
    setKeyword('');
    pick(pickId, name);
  };

  const onKeyChange = (text: string) => {
    setKeyword(text);
  };
  const data = useMemo(() => {
    if (keyword !== '') {
      return locations.filter(location =>
        StringUtils.fullTextSearch(keyword, location.name),
      );
    }
    return locations;
  }, [keyword, locations]);
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));
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
      snapPoints={['90%']}
      ref={modalRef}>
      <View style={PickStoreStyle.container}>
        <View style={PickStoreStyle.header}>
          <CTButtonIcon
            onPress={onClose}
            style={PickStoreStyle.icClose}
            icon={ic_close}
            iconStyle={PickStoreStyle.iconClose}
          />
          <CTTypography.Text
            font={Font.Medium}
            level="2"
            text="Chọn cửa hàng nhập"
          />
        </View>
        <View style={[PickStoreStyle.body]}>
          <View style={PickStoreStyle.searchView}>
            <SearchInput
              style={PickStoreStyle.customBackground}
              placeholder="Nhập từ khóa tìm kiếm"
              value={keyword}
              onChangeText={onKeyChange}
            />
          </View>
          <BottomSheetFlatList
            keyboardShouldPersistTaps="handled"
            renderItem={({item, index}) => (
              <View style={PickStoreStyle.itemContainer}>
                <TouchableOpacity
                  onPress={() => onSelect(item.id, item.name)}
                  style={[
                    PickStoreStyle.btn,
                    item.id === storeId ? PickStoreStyle.selected : null,
                  ]}>
                  <Typography
                    text={item.name}
                    color={colors.secondary.o900}
                    type="h4"
                  />
                </TouchableOpacity>
                {locations.length !== index + 1 && (
                  <View style={ThemeStyle.separator12} />
                )}
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            data={data}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(PickStoreView);
