import {Colors} from 'assets/colors';
import {ic_delete, ic_search} from 'assets/images';
import {CTInput} from 'components/Base';
import {CTButtonIcon} from 'components/Button';
import React from 'react';
import {Image, View} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import SearchInputBarcodeStyle from './style';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  autoFocus?: boolean;
}

const SearchInputBarcode: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
  autoFocus,
}) => {
  return (
    <View style={SearchInputBarcodeStyle.container}>
      <View style={SearchInputBarcodeStyle.imgSearch}>
        <Image source={ic_search} />
      </View>
      <CTInput
        style={SearchInputBarcodeStyle.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.SubText2}
        fontSize={normalize(13)}
        onChangeText={onChangeText}
        value={value}
        autoFocus={autoFocus}
      />
      {value !== '' && (
        <CTButtonIcon
          style={SearchInputBarcodeStyle.iconClear}
          onPress={() => onChangeText('')}
          icon={ic_delete}
        />
      )}
    </View>
  );
};

export default SearchInputBarcode;
