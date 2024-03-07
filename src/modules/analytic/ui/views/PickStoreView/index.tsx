import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Dimensions, Keyboard, TouchableOpacity, View} from 'react-native';
import {SearchInput} from 'ui/view/Common';
import StringUtils from 'utils/StringUtils';
import PickStoreStyle from './style';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Typography, useBottomSheetBackHandler} from 'common-ui';
import {colors} from 'assets/v2';
import {ic_close} from 'assets/images';
import {CTButtonIcon} from 'components/Button';
import {useAuth} from 'providers/contexts/AuthContext';

export interface PickStoreProps {
  pick: (id: number, name: string) => void;
  storeId: number;
  height?: number;
}

export type PickStoreRef = {
  open: () => void;
  close: () => void;
};

export type PickStoreComponent = ForwardRefRenderFunction<
  PickStoreRef,
  PickStoreProps
>;
const HEIGHT = Dimensions.get('screen').height;
const HEIGHT_ONE_ROW = 164;

const PickStoreView: PickStoreComponent = ({storeId, pick}, ref) => {
  const modalRef = createRef<BottomSheetModal>();
  const [key, setKey] = useState<string>('');
  const {locations} = useAuth();
  const onOpen = () => {
    setKey('');
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };

  const onSelect = (pickId: number, name: string) => {
    setKey('');
    pick(pickId, name);
  };

  const onKeyChange = (text: string) => setKey(text);

  const data = useMemo(() => {
    if (key !== '') {
      return locations.filter(item =>
        StringUtils.fullTextSearch(key, item.name),
      );
    }
    return locations;
  }, [locations, key]);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));

  const heightModal = useMemo((): [number, boolean] => {
    if (locations && locations.length === 1) {
      return [HEIGHT_ONE_ROW, true];
    }
    return [(85 * HEIGHT) / 100, false];
  }, [locations]);
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);

  return (
    <BottomSheetModal
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
      containerStyle={{backgroundColor: colors.base.tranparents}}
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
            text="Chọn cửa hàng"
          />
        </View>
        <View style={[PickStoreStyle.body]}>
          {!heightModal[1] && (
            <View style={PickStoreStyle.searchView}>
              <SearchInput
                style={PickStoreStyle.customBackground}
                placeholder="Tìm kiếm"
                value={key}
                onChangeText={onKeyChange}
              />
            </View>
          )}
          <BottomSheetFlatList
            keyboardShouldPersistTaps="handled"
            renderItem={({item, index}) => (
              <View style={[PickStoreStyle.itemContainer]}>
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
                  <View style={ThemeStyle.separator} />
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
