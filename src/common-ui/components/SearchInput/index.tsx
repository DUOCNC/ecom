import {ic_delete, ic_search} from 'assets/images';
import {colors} from 'assets/v2';
import {TextInput} from 'common-ui/core';
import {SearchInputProps} from 'common-ui/types';
import React, {useMemo} from 'react';
import {Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import style from './style';

const SearchInput: React.FC<SearchInputProps> = ({
  themeStyle = 'dark',
  value,
  right,
  autoFocus,
  placeholder,
  enablesReturnKeyAutomatically,
  onValueChange,
  onSearchPress,
}) => {
  const theme = useMemo(() => {
    if (themeStyle === 'dark') {
      return style.dark;
    }
    return style.light;
  }, [themeStyle]);
  const iconStyle = useMemo(() => {
    if (themeStyle === 'dark') {
      return style.dark;
    }
    return style.light;
  }, [themeStyle]);
  return (
    <View>
      <View style={[style.container, theme]}>
        <View style={style.btn}>
          <Image
            resizeMode="cover"
            style={[iconStyle, style.icon]}
            source={ic_search}
          />
        </View>
        <TextInput
          importantForAutofill="noExcludeDescendants"
          size={14}
          returnKeyType="search"
          fontWeight="400"
          maxLength={255}
          style={style.input}
          autoFocus={autoFocus}
          autoCapitalize="none"
          value={value}
          onChangeText={onValueChange}
          placeholder={placeholder}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          onSubmitEditing={() =>
            onSearchPress && onSearchPress(value ? value : '')
          }
          placeholderTextColor={colors.secondary.o500}
        />
        {value && value !== '' ? (
          <TouchableOpacity
            onPress={() => onValueChange && onValueChange('')}
            style={style.btnDel}>
            <Image
              resizeMode="cover"
              style={[style.iconDel]}
              source={ic_delete}
            />
          </TouchableOpacity>
        ) : null}

        {right && (
          <View style={style.rightView}>
            <View style={style.rule} />
            {right}
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
