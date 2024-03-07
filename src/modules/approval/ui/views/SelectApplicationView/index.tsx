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
import {ic_arrow, ic_x_close_circle} from 'assets/images';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StringUtils from 'utils/StringUtils';
import CTTypography from 'components/CTTypography';
import SearchInput from 'ui/view/Common/SearchInput';
import {ThemeStyle} from 'assets/theme';
import {ScrollView} from 'react-native-gesture-handler';

const MAX_DEFAULT = 20;
export interface CTInputProps extends BaseText {
  title?: string;
  error?: string;
  isPassword?: boolean;
  dataSource: Array<any>;
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

const SelectApplicationView: CTSelectInput = (props, ref) => {
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
    let index = dataSource.findIndex(data => data.value === value);

    if (index === -1) {
      return title;
    }
    return dataSource[index].label;
  }, [dataSource, title, value]);

  const dataDisplayAfterFilter = useMemo(() => {
    if (customSearch || key === '') {
      return dataSource;
    }
    return dataSource.filter(item =>
      StringUtils.fullTextSearch(key, item.label),
    );
  }, [customSearch, dataSource, key]);

  const onPressSelect = () => {
    rbRef.current?.open();
  };

  const onCloseSelect = () => {
    setFocusable(false);
  };

  const onSelect = (dataSelect: {value: string; label: string}) => {
    onChangeValue(dataSelect.value);
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

  const clearValue = () => {
    onChangeValue(null);
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
        {!disabled && value === null ? (
          <View style={CSelectTypeStyle.btnIcon}>
            <Image source={ic_arrow} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={clearValue}
            style={CSelectTypeStyle.btnIcon}>
            <Image style={CSelectTypeStyle.clear} source={ic_x_close_circle} />
          </TouchableOpacity>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataDisplayAfterFilter.map(item => {
              return (
                <View style={CSelectTypeStyle.flatList} key={item.value}>
                  <ItemSelect
                    selected={item.value === value}
                    item={item}
                    onPress={v => {
                      onSelect({value: v, label: item.label});
                    }}
                  />
                  <View style={ThemeStyle.separator} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

type ItemSelectProps = {
  item: {value: string; label: string};
  onPress: (value: string) => void;
  selected: boolean;
};

const ItemSelect: React.FC<ItemSelectProps> = (props: ItemSelectProps) => {
  const {item, onPress, selected} = props;
  return (
    <TouchableOpacity
      style={[CSelectTypeStyle.rowSelect, selected && CSelectTypeStyle.select]}
      onPress={() => onPress(item.value)}
      key={item.value}>
      <CTTypography.Text level="3" font={Font.Regular} text={item.label} />
    </TouchableOpacity>
  );
};

export default forwardRef(SelectApplicationView);
