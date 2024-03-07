import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {BaseText, Font} from 'components/Base/Text';
import {
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {CSelectTypeStyle} from './style';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {ic_arrow} from 'assets/images';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StringUtils from 'utils/StringUtils';
import CTTypography from 'components/CTTypography';
import SearchInput from 'ui/view/Common/SearchInput';
import {ThemeStyle} from 'assets/theme';
import ViewTypeEntity from 'modules/analytic/models/entities/ViewTypeEntity';

const MAX_DEFAULT = 10;
export interface CTInputProps extends BaseText {
  title?: string;
  error?: string;
  isPassword?: boolean;
  dataSource: Array<ViewTypeEntity>;
  defaultValue?: string;
  value?: any;
  disabled?: boolean;
  showSearch?: boolean;
  customSearch?: boolean;
  onSearching?: (key: string) => void;
  onChangeValue: (value: any) => void;
  fullModal?: boolean;
}

export type CTSelectRef = {
  focus: () => void;
};

export type CTSelectInput = ForwardRefRenderFunction<CTSelectRef, CTInputProps>;

const CSelectType: CTSelectInput = (props, ref) => {
  const [key, setKey] = useState<string>('');
  const bottom = useSafeAreaInsets().bottom;
  const {
    disabled,
    showSearch,
    title,
    error,
    value,
    dataSource,
    customSearch,
    fullModal,
    onSearching,
    onChangeValue,
  } = props;
  const [focusable, setFocusable] = useState<boolean>(false);
  const rbRef = createRef<RBSheet>();
  const moveText = useRef(new Animated.Value(0)).current;
  const moveTextTop = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);

  const moveTextBottom = useCallback(() => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [moveText]);
  const borderColor = useMemo(() => {
    if (error !== undefined && error !== null && error !== '') {
      return Colors.Error;
    }
    return focusable ? Colors.Blue : Colors.Border;
  }, [error, focusable]);

  const dataDisplay = useMemo(() => {
    let index = dataSource.findIndex(data => data.getValue() === value);
    if (index === -1) {
      return '';
    }
    return dataSource[index].getDisplay();
  }, [dataSource, value]);

  const dataDisplayAfterFilter = useMemo(() => {
    if (customSearch || key === '') {
      return dataSource;
    }
    return dataSource.filter(item =>
      StringUtils.fullTextSearch(key, item.getDisplay()),
    );
  }, [customSearch, dataSource, key]);

  const onPressSelect = () => {
    rbRef.current?.open();
  };

  const onCloseSelect = () => {
    setFocusable(false);
  };

  const onSelect = (dataSelect: any) => {
    onChangeValue(dataSelect);
    rbRef.current?.close();
  };

  const onKeyChange = (keyChange: string) => {
    setKey(keyChange);
    if (customSearch) {
      onSearching && onSearching(keyChange);
    }
  };

  const height = useMemo(() => {
    let heightDefault = 75;
    let list = 240;
    if (dataSource.length < MAX_DEFAULT) {
      list = dataSource.length * 41;
    }
    if (showSearch) {
      heightDefault = heightDefault + 68;
    }
    return heightDefault + list + bottom;
  }, [bottom, dataSource.length, showSearch]);
  const focus = () => {
    Keyboard.dismiss();
    rbRef.current?.open();
  };
  useImperativeHandle(ref, () => ({
    focus: focus,
  }));
  useEffect(() => {
    if (!focusable) {
      if (value && value && value !== '') {
        moveTextTop();
        return;
      }
      moveTextBottom();
    }
  }, [focusable, moveTextBottom, moveTextTop, value]);

  return (
    <View style={CSelectTypeStyle.container}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressSelect}
        style={[
          CSelectTypeStyle.body,
          {
            borderColor: borderColor,
          },
        ]}>
        <View style={CSelectTypeStyle.input}>
          <CTTypography.Text
            style={CSelectTypeStyle.inputDisplay}
            font={Font.Medium}
            level="3"
            numberOfLines={1}
            ellipsizeMode="tail"
            text={dataDisplay}
          />
        </View>
        {!disabled && (
          <View style={CSelectTypeStyle.btnIcon}>
            <Image source={ic_arrow} />
          </View>
        )}
      </TouchableOpacity>
      {error && error.length > 0 && (
        <View style={CSelectTypeStyle.viewError}>
          <CTTypography.Text
            style={CSelectTypeStyle.error}
            text={error}
            level="2"
          />
        </View>
      )}
      <RBSheet
        animationType="fade"
        height={
          fullModal
            ? (90 * Dimensions.get('screen').height) / 100
            : normalize(height)
        }
        dragFromTopOnly
        onOpen={() => {
          setFocusable(true);
        }}
        onClose={onCloseSelect}
        keyboardAvoidingViewEnabled={!fullModal}
        customStyles={{
          container: CSelectTypeStyle.containerSelect,
          draggableIcon: CSelectTypeStyle.draggableIcon,
        }}
        ref={rbRef}>
        <View
          style={{paddingBottom: bottom, ...CSelectTypeStyle.containerModal}}>
          <View style={CSelectTypeStyle.rowTitle}>
            <CTTypography.Text level="1" font={Font.Medium} text={title} />
          </View>
          {showSearch && (
            <View style={CSelectTypeStyle.containerSearch}>
              <SearchInput
                style={CSelectTypeStyle.customBackground}
                placeholder="Nhập từ khóa tìm kiếm"
                value={key}
                onChangeText={onKeyChange}
              />
            </View>
          )}
          {dataDisplayAfterFilter.map(item => {
            return (
              <View style={CSelectTypeStyle.flatList} key={item.getValue()}>
                <ItemSelect
                  selected={item.getValue() === value}
                  item={item}
                  onPress={itemSelect => onSelect(itemSelect.getValue())}
                />
                <View style={ThemeStyle.separator} />
              </View>
            );
          })}
        </View>
      </RBSheet>
    </View>
  );
};

type ItemSelectProps = {
  item: ViewTypeEntity;
  onPress: (item: ViewTypeEntity) => void;
  selected: boolean;
};

const ItemSelect: React.FC<ItemSelectProps> = (props: ItemSelectProps) => {
  const {item, onPress, selected} = props;
  return (
    <TouchableOpacity
      style={[CSelectTypeStyle.rowSelect, selected && CSelectTypeStyle.select]}
      onPress={() => onPress(item)}
      key={item.getValue()}>
      <CTTypography.Text
        level="3"
        font={Font.Regular}
        text={item.getSubDisplayUpper()}
      />
    </TouchableOpacity>
  );
};

export default forwardRef(CSelectType);
