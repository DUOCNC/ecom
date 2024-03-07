/*
 * Create By: Ánh Nguyễn
 * Version: 1.0.0
 * Module: Base Component
 */
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
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import CTText from 'components/Base/CTText';
import {CTSelectStyle} from './style';
import {Colors} from 'assets/colors';
import {normalize} from 'utils/DimensionsUtils';
import {ic_drop_down, ic_tick} from 'assets/images';
import {DataSelect} from './DataSelect';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import StringUtils from 'utils/StringUtils';
import CTTypography from 'components/CTTypography';
import SearchInput from 'ui/view/Common/SearchInput';
import {ThemeStyle} from 'assets/theme';

const MAX_DEFAULT = 10;
export interface CTInputProps extends BaseText {
  title?: string;
  error?: string;
  isPassword?: boolean;
  dataSource: Array<DataSelect>;
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

const CTFormInput: CTSelectInput = (props, ref) => {
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
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -normalize(14)],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const dataDisplay = useMemo(() => {
    let index = dataSource.findIndex(data => data.value === value);
    if (index === -1) {
      return '';
    }
    return dataSource[index].display;
  }, [dataSource, value]);

  const dataDisplayAfterFilter = useMemo(() => {
    if (customSearch || key === '') {
      return dataSource;
    }
    return dataSource.filter(item =>
      StringUtils.fullTextSearch(key, item.display),
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
    <View style={CTSelectStyle.container}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressSelect}
        style={[
          CTSelectStyle.body,
          {
            borderColor: borderColor,
          },
          disabled && CTSelectStyle.disable,
        ]}>
        <Animated.View style={[CTSelectStyle.animatedStyle, animStyle]}>
          <CTText
            style={CTSelectStyle.title}
            font={Font.Regular}
            fontSize={dataDisplay === '' ? 15 : 11}
            text={title}
          />
        </Animated.View>
        <View style={CTSelectStyle.input}>
          <CTTypography.Text
            style={CTSelectStyle.inputDisplay}
            font={Font.Regular}
            level="2"
            numberOfLines={1}
            ellipsizeMode="tail"
            text={dataDisplay}
          />
        </View>
        {!disabled && (
          <View style={CTSelectStyle.btnPassword}>
            <Image source={ic_drop_down} />
          </View>
        )}
      </TouchableOpacity>
      {error && error.length > 0 && (
        <View style={CTSelectStyle.viewError}>
          <CTTypography.Text
            style={CTSelectStyle.error}
            text={error}
            level="2"
          />
        </View>
      )}
      <RBSheet
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
          container: CTSelectStyle.containerSelect,
          draggableIcon: CTSelectStyle.draggableIcon,
        }}
        ref={rbRef}>
        <View style={{paddingBottom: bottom, ...CTSelectStyle.containerModal}}>
          <View style={CTSelectStyle.rowTitle}>
            <CTTypography.Text level="1" font={Font.Medium} text={title} />
          </View>
          {showSearch && (
            <View style={CTSelectStyle.containerSearch}>
              <SearchInput
                style={CTSelectStyle.customBackground}
                placeholder="Nhập từ khóa tìm kiếm"
                value={key}
                onChangeText={onKeyChange}
              />
            </View>
          )}
          <FlatList
            data={dataDisplayAfterFilter}
            keyExtractor={item => item.value}
            style={[CTSelectStyle.flatList]}
            ItemSeparatorComponent={() => (
              <View style={ThemeStyle.separator16} />
            )}
            ListEmptyComponent={() => (
              <CTTypography.Text
                style={CTSelectStyle.emptyText}
                level="2"
                text="Không tìm thấy dữ liệu"
              />
            )}
            renderItem={({item}) => (
              <ItemSelect
                selected={item.value === value}
                item={item}
                onPress={itemSelect => onSelect(itemSelect.value)}
              />
            )}
          />
        </View>
      </RBSheet>
    </View>
  );
};

type ItemSelectProps = {
  item: DataSelect;
  onPress: (item: DataSelect) => void;
  selected: boolean;
};

const ItemSelect: React.FC<ItemSelectProps> = (props: ItemSelectProps) => {
  const {item, onPress, selected} = props;
  return (
    <TouchableOpacity
      style={[CTSelectStyle.rowSelect, selected && CTSelectStyle.select]}
      onPress={() => onPress(item)}
      key={item.value}>
      <CTTypography.Text
        fontSize={15}
        font={Font.Regular}
        text={item.display}
      />
      {selected && <Image source={ic_tick} />}
    </TouchableOpacity>
  );
};

export default forwardRef(CTFormInput);
