import {ic_search} from 'assets/images';
import {CTText} from 'components/Base';
import {Font} from 'components/Base/Text';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {SearchButtonStyle} from './style';

interface SearchButtonProps {
  title: string;
  onPress: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = (
  props: SearchButtonProps,
) => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={SearchButtonStyle.container}>
      <Image source={ic_search} />
      <CTText
        font={Font.Medium}
        fontSize={14}
        style={SearchButtonStyle.txtSearch}
        numberOfLines={1}
        ellipsizeMode="tail"
        text={title}
      />
    </TouchableOpacity>
  );
};

export default SearchButton;
